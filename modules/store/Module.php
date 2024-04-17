<?php

namespace app\modules\store;

use yii\web\Response;

/**
 * store module definition class
 */
class Module extends \yii\base\Module
{
    /**
     * {@inheritdoc}
     */
    public $controllerNamespace = 'app\modules\store\controllers';

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();

        \Yii::$app->response->on(\yii\web\Response::EVENT_BEFORE_SEND, function ($event) {
            $response = $event->sender;
            if ($response->data !== null && !empty(\Yii::$app->request->get('suppress_response_code'))) {
                $response->data = [
                    'status' => $response->isSuccessful,
                    'data' => $response->data,
                ];
                $response->statusCode = 200;
            }
        });
        // custom initialization code goes here
    }
}
