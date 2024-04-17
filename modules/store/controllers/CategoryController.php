<?php

namespace app\modules\store\controllers;

use Yii;
use app\modules\store\models\Category;
use app\modules\store\models\CategorySearch;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;

/**
 * CategoryController implements the CRUD actions for Category model.
 */
class CategoryController extends ActiveController
{
    /**
     * {@inheritdoc}
     */
    public $modelClass = Category::class;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
        ];
        return $behaviors;
    }

    protected function verbs()
    {
        $verbs = parent::verbs();
        $verbs["update"] = ["POST"];
        $verbs["delete"] = ["POST"];
        return $verbs;
    }

    public function actions()
    {
        $actions = parent::actions();
        $actions['index']['prepareDataProvider'] = [$this, 'prepareDataProvider'];
        return $actions;
    }

    /**
     * Lists all Customers models.
     * @return mixed
     */
    public function prepareDataProvider()
    {
        $searchModel = new CategorySearch();
        return $searchModel->search(Yii::$app->request->queryParams);
    }
}
