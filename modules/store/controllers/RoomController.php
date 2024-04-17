<?php

namespace app\modules\store\controllers;

use Yii;
use app\modules\store\models\Store;
use app\modules\store\models\StoreSearch;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\Controller;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * RoomController implements the CRUD actions for Store model.
 */
class RoomController extends Controller
{

    public $modelClass = Store::class;
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
        return $actions;
    }
    protected function verbs()
    {
        $verbs = parent::verbs();
        $verbs["update"] = ["POST"];
        $verbs["delete"] = ["POST"];
        return $verbs;
    }

    public function actionList($q)
    {
        $list = new StoreSearch();
        return $list->search(['vkey' => $q]);
    }
}
