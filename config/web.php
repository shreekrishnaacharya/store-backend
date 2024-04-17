<?php

use yii\web\JsonParser;

$params = require __DIR__ . '/params.php';
$db = require __DIR__ . '/db.php';

$config = [
    'id' => 'basic',
    'basePath' => dirname(__DIR__),
    'bootstrap' => ['log'],
    'defaultRoute' => 'site/index',
    'aliases' => [
        '@bower' => '@vendor/bower-asset',
        '@npm' => '@vendor/npm-asset',
    ],
    'modules' => [
        'store' => [
            'class' => 'app\modules\store\Module',
        ],
    ],
    'components' => [
        'request' => [
            // !!! insert a secret key in the following (if it is empty) - this is required by cookie validation
            'cookieValidationKey' => 'svdskvjsbSHdsvdsvsdjcdcsdjkcnkj',
            'parsers' => [
                'application/json' => JsonParser::class,
                'multipart/form-data' => 'yii\web\MultipartFormDataParser'
            ],
            'enableCsrfCookie' => false,
            'enableCsrfValidation'   => false,
        ],
        // 'response' => [
        //     'class' => 'yii\web\Response',
        //     'on beforeSend' => function ($event) {
        //         $response = $event->sender;
        //         if ($response->data !== null && Yii::$app->request->get('suppress_response_code')) {
        //             $response->data = [
        //                 'success' => $response->isSuccessful,
        //                 'data' => $response->data,
        //             ];
        //             $response->statusCode = 200;
        //         }
        //     },
        // ],
        'response' => [
            'format' => yii\web\Response::FORMAT_JSON,
        ],
        'cache' => [
            'class' => 'yii\caching\FileCache',
        ],
        'user' => [
            'identityClass' => 'app\models\User',
        ],
        'errorHandler' => [
            'errorAction' => 'site/error',
        ],
        'mailer' => [
            'class' => 'yii\swiftmailer\Mailer',
            'transport' => [
                'class' => 'Swift_SmtpTransport',
                'host' => $params["emailhost"],
                'username' => $params["emailuser"],
                'password' => $params["emailpassword"],
                'port' => '587',
                'encryption' => 'tls',
            ],
            'useFileTransport' => false,
        ],
        'log' => [
            'traceLevel' => YII_DEBUG ? 3 : 0,
            'targets' => [
                [
                    'class' => 'yii\log\FileTarget',
                    'levels' => ['error', 'warning'],
                ],
            ],
        ],
        'db' => $db,

        'urlManager' => [
            'class' => 'yii\web\UrlManager',
            'enablePrettyUrl' => true,
            'showScriptName' => true,
            'rules' => [
                [
                    'class' => 'yii\rest\UrlRule',
                    'controller' => [
                        'store/item',
                        'store/vend',
                        'store/contact',
                        'store/category',
                        'store/customer',
                        'store/purchase',
                        'store/sales',
                    ],
                ],
                // [
                //     'class' => 'yii\rest\UrlRule',
                //     'controller' => 'store/vend',
                // ],
                // [
                //     'class' => 'yii\rest\UrlRule',
                //     'controller' => 'store/account',
                //     'extraPatterns' => [
                //         'PUT,PATCH store/account' => 'store/account/update',
                //         'GET,HEAD store/account' => 'store/account/view',
                //         'GET,HEAD store/account/change-pass' => 'store/account/change-password',
                //         'store/account' => 'store/account/options',
                //     ]
                // ]
            ],
        ],


    ],
    'params' => $params,
];

if (YII_ENV_DEV) {
    // configuration adjustments for 'dev' environment
    $config['bootstrap'][] = 'debug';
    $config['modules']['debug'] = [
        'class' => 'yii\debug\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
    ];

    $config['bootstrap'][] = 'gii';
    $config['modules']['gii'] = [
        'class' => 'yii\gii\Module',
        // uncomment the following to add your IP if you are not connecting from localhost.
        //'allowedIPs' => ['127.0.0.1', '::1'],
        'generators' => [
            // add ApiGenerator to Gii module
            'api' => \cebe\yii2openapi\generator\ApiGenerator::class,
        ],
    ];
}

return $config;
