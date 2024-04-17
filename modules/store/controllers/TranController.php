<?php

namespace app\modules\store\controllers;

use app\modules\store\models\Trans;
use app\modules\store\models\TranSearch;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\rest\ActiveController;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;

/**
 * TranController implements the CRUD actions for Trans model.
 */
class TranController extends ActiveController
{
    public $modelClass = "\app\models\Trans";
    public $updateScenario = Trans::SCENARIO_DEFAULT;
    public $createScenario = Trans::SCENARIO_DEFAULT;
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

    protected function verbs()
    {
        $verbs = parent::verbs();
        $verbs["update"] = ["POST"];
        $verbs["delete"] = ["POST"];
        return $verbs;
    }

    /**
     * Lists all Trans models.
     * @return mixed
     */
    public function actionIndex()
    {
        $searchModel = new TranSearch();
        $dataProvider = $searchModel->search(Yii::$app->request->queryParams);

        return $this->render('index', [
            'searchModel' => $searchModel,
            'dataProvider' => $dataProvider,
        ]);
    }
}
