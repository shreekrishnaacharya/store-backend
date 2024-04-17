<?php

namespace app\modules\store\controllers;

use app\modules\store\models\ItemPrice;
use app\modules\store\models\Items;
use app\modules\store\models\ItemSearch;
use app\modules\store\models\ItemVend;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use yii\web\ServerErrorHttpException;

/**
 * ItemController implements the CRUD actions for Items model.
 */
class ItemController extends ActiveController
{
    public $modelClass = Items::class;

    /**
     * {@inheritdoc}
     */
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

    public function prepareDataProvider()
    {
        $searchModel = new ItemSearch();
        return $searchModel->search(Yii::$app->request->queryParams);
    }

    public function actionCreate()
    {
        $model = new Items();
        if ($model = $this->formProcess($model)) {
            return $model;
        } else {
            throw new ServerErrorHttpException('Data not submitted');
        }
    }

    public function actionDeleteVend($id)
    {
        $count = ItemVend::deleteAll(["id" => $id]);
        if ($count == 0) {
            throw new NotFoundHttpException("Object not found: $id");
        }
        Yii::$app->getResponse()->setStatusCode(204);
    }

    public function actionUpdateVend($id)
    {
        $model = $this->findVend($id);
        if ($model->load(Yii::$app->request->post(), '') && $model->save()) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
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

    public function actionList($q)
    {
        $list = new ItemSearch();
        return $list->search(['ikey' => $q]);
    }

    private function formProcess($model)
    {
        if ($model->load(Yii::$app->request->post(), '')) {
            $model->image = \yii\web\UploadedFile::getInstanceByName("image");
            $imageHelper = new \app\Helpers\ImageHelper();
            if ($model->image != null) {
                $fileName = "item_" . time();
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
                $location = PATH_TO_RESOURCE . '/items/' . $model->id . '/';
                $imageHelper->mkdir($location . "/thumb");
                $imageHelper->setImageLocation($location);
                $imageHelper->setThumbImageLocation("thumb");
                $imageHelper->upload();
                $model->save(false);
            }

            if ($model->getOldAttribute("sprice") != $model->sprice) {
                $sprice = new ItemPrice();
                $sprice->fk_item_id = $model->id;
                $sprice->price = $model->sprice;
                $sprice->save(false);
            }
            if (!$model->isNewRecord && !$model->save(false)) {
                return false;
            }
            $vendors = Yii::$app->request->post("vendor");
            if (!empty($vendors)) {
                foreach ($vendors as $ved) {
                    $ivend = new ItemVend();
                    $ivend->fk_item_id = $model->id;
                    $ivend->fk_vend_id = $ved["id"];
                    $ivend->sp = $ved["price"];
                    $ivend->save(false);
                }
            }

            $response = Yii::$app->getResponse();
            $response->setStatusCode(201);
            return $model;
        }
        return false;
    }

    protected function findModel($id)
    {
        if (($model = Items::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }

    protected function findVend($id)
    {
        if (($model = ItemVend::findOne($id)) !== null) {
            return $model;
        }
        throw new NotFoundHttpException("Object not found: $id");
    }
}
