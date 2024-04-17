<?php

namespace app\modules\store\controllers;

use Yii;
use yii\rest\Controller;
use app\models\User;
use app\models\Status;
use app\modules\store\models\Dashboard;
use yii\filters\auth\HttpBearerAuth;
use yii\helpers\ArrayHelper;

/**
 * Dashboard controller for the `store` module
 */
class DashboardController extends Controller
{

    /**
     * Renders the index view for the module
     * @return string
     */
    public function behaviors()
    {
        $behaviors = parent::behaviors();
        $behaviors['authenticator'] = [
            'class' => HttpBearerAuth::class,
        ];
        return $behaviors;
    }

    public function actionIndex()
    {
        $dashboard = new Dashboard();
        $dashboard->setDate(strtotime("-50years"), time());
        $data["minicard"] = $dashboard->getMiniCard();
        $data["bar"][0]["name"] = "Vendors";
        $data["bar"][0]["data"] = ArrayHelper::map($dashboard->getDailyVendor(), "idate", "cnt");
        $data["bar"][1]["name"] = "Items";
        $data["bar"][1]["data"] = ArrayHelper::map($dashboard->getDailyItems(), "idate", "cnt");
        $data["bar"][2]["name"] = "Customers";
        $data["bar"][2]["data"] = ArrayHelper::map($dashboard->getDailyCustomer(), "idate", "cnt");
        $data["purchase"] = $dashboard->getPurchase();
        $data["sales"] = $dashboard->getSales();


        $data["purchase_pay"] = $dashboard->getPurchasePay();
        $data["sales_pay"] = $dashboard->getSalesPay();
        $data["purchase_line"] = $dashboard->getPurchaseLine();
        $data["sales_line"] = $dashboard->getSalesLine();
        $data["minicard"]["purchase"] = 0;
        $data["minicard"]["sales"] = 0;
        if (count($data["purchase"]) > 0) {
            $data["minicard"]["purchase"] = round(array_sum(array_column($data["purchase"], "amt")), 2);
        }
        if (count($data["sales"]) > 0) {
            $data["minicard"]["sales"] = round(array_sum(array_column($data["sales"], "amt")), 2);
        }

        return [
            'flag' => true,
            'status' => Status::STATUS_OK,
            'message' => "Success",
            'data' => $data
        ];
    }
}
