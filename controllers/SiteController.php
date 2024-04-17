<?php

namespace app\controllers;

use Yii;
use yii\web\Controller;
use app\models\User;
use app\models\Status;
use yii\web\Response;

/**
 * Site controller
 */
class SiteController extends Controller
{
    /**
     * Renders the index view for the module
     * @return string
     */
    public function actionIndex()
    {
        $this->response->format = Response::FORMAT_HTML;
        return $this->render("index");
    }
}
