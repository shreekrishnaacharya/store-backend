<?php

namespace app\modules\store\controllers;

use app\models\Status;
use app\modules\store\models\ContactMeta;
use Yii;
use app\modules\store\models\Contacts;
use app\modules\store\models\ContactSearch;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

/**
 * CustomerController implements the CRUD actions for Customers model.
 */
class ContactController extends ActiveController
{
    /**
     * {@inheritdoc}
     */
    public $modelClass = Contacts::class;

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
        $searchModel = new ContactSearch();
        return $searchModel->search(Yii::$app->request->queryParams);
    }

    public function actionCreate()
    {
        $model = new Contacts();
        if ($model = $this->formProcess($model)) {
            return $model;
        } else {
            throw new ServerErrorHttpException('Data not submitted');
        }
    }

    public function actionUpdate($id)
    {
        $model = $this->findModel($id);
        if ($model = $this->formProcess($model)) {
            return $model;
        } else {
            throw new ServerErrorHttpException('Data not submitted');
        }
    }


    private function formProcess($model)
    {
        if ($model->load(Yii::$app->request->post(), '') && !empty(Yii::$app->request->post("contact"))) {
            $model->image = \yii\web\UploadedFile::getInstanceByName("image");
            if ($model->image != null) {
                $fileName = "contact_" . time();
                $imageHelper = new \app\Helpers\ImageHelper();
                $imageHelper->setImageName($fileName);
                $imageHelper->setCropSize(700);
                $imageHelper->setThumbCropSize(100);
                $imageHelper->setImageFile($model->image);
                $model->img = $imageHelper->getImageName();
            }
            if ($model->isNewRecord && !$model->save(false)) {
                return false;
            }
            if ($model->image != null) {
                $location = PATH_TO_RESOURCE . '/contact/' . $model->id . '/';
                $imageHelper->mkdir($location . "/thumb");
                $imageHelper->setImageLocation($location);
                $imageHelper->setThumbImageLocation("thumb");
                $imageHelper->upload();
                $model->save(false);
            }
            if (!$model->isNewRecord && !$model->save(false)) {
                return false;
            }
            ContactMeta::deleteAll(["fcont" => $model->id]);
            $contacts = Yii::$app->request->post("contact");
            foreach ($contacts as $cont) {
                $cmodel = new ContactMeta();
                $cmodel->fcont = $model->id;
                $cmodel->typ = $cont["type"];
                $cmodel->cont = $cont["phone"];
                $cmodel->save(false);
            }
            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            return $model;
        }
        return false;
    }

    protected function findModel($id)
    {
        if (($model = Contacts::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }
}
