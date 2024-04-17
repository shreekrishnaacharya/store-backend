<?php

namespace app\modules\store\controllers;

use app\models\Status;
use app\modules\store\models\ContactMeta;
use app\modules\store\models\Contacts;
use Yii;
use app\modules\store\models\Customers;
use app\modules\store\models\CustomerSearch;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

/**
 * CustomerController implements the CRUD actions for Customers model.
 */
class CustomerController extends ActiveController
{
    /**
     * {@inheritdoc}
     */
    public $enableCsrfValidation = false;
    public $modelClass = Customers::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
        ];
        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        unset($actions['create']);
        unset($actions['update']);
        return $actions;
    }

    protected function verbs()
    {
        $verbs = parent::verbs();
        $verbs["update"] = ["POST"];
        $verbs["delete"] = ["POST"];
        return $verbs;
    }

    /**
     * Lists all Customers models.
     * @return mixed
     */
    public function prepareDataProvider()
    {
        $searchModel = new CustomerSearch();
        return $searchModel->search(Yii::$app->request->queryParams);
    }

    public function actionList($q)
    {
        $list = new CustomerSearch();
        return $list->search(['ckey' => $q]);
    }

    public function actionCreate()
    {
        $model = new Customers();
        $cmodel = new Contacts();
        if ($model = $this->formProcess($model, $cmodel)) {
            return $model;
        } else {
            throw new ServerErrorHttpException('Data not submitted');
        }
    }

    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        $cmodel = new Contacts();
        if (!empty($model->fcnt)) {
            $cmodel = $this->findContact($model->fcnt);
        }
        if ($model = $this->formProcess($model, $cmodel)) {
            return $model;
        } else {
            throw new ServerErrorHttpException('Data not submitted');
        }
    }

    private function formProcess($model, $cmodel)
    {
        if ($model->load(Yii::$app->request->post(), '')) {
            $cmodel->name = $model->nam;
            $cmodel->ads = $model->ads;
            $cmodel->image = \yii\web\UploadedFile::getInstanceByName("image");
            if ($cmodel->isNewRecord && !$cmodel->save(false)) {
                return false;
            }
            $model->fcnt = $cmodel->id;
            if ($cmodel->image != null) {
                $fileName = "contact_" . time();
                $imageHelper = new \app\Helpers\ImageHelper();
                $imageHelper->setImageName($fileName);
                $imageHelper->setCropSize(700);
                $imageHelper->setThumbCropSize(100);
                $imageHelper->setImageFile($cmodel->image);
                $cmodel->img = $imageHelper->getImageName();
                $location = PATH_TO_RESOURCE . '/contact/' . $cmodel->id . '/';
                $imageHelper->mkdir($location . "/thumb");
                $imageHelper->setImageLocation($location);
                $imageHelper->setThumbImageLocation("thumb");
                $imageHelper->upload();
                $cmodel->save(false);
            }
            if (!$model->isNewRecord && !$model->save(false)) {
                return false;
            }
            ContactMeta::deleteAll(["fcont" => $cmodel->id]);
            $contacts = Yii::$app->request->post("contacts");
            foreach ($contacts as $cont) {
                $codel = new ContactMeta();
                $codel->fcont = $cmodel->id;
                $codel->typ = $cont["type"];
                $codel->cont = $cont["phone"];
                $codel->save(false);
            }
            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            return $model;
        }
        return false;
    }

    protected function findModel($id)
    {
        if (($model = Customers::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }

    protected function findContact($id)
    {
        if (($model = Contacts::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }
}
