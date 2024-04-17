<?php

/**
 * @link http://www.yiiframework.com/
 * @copyright Copyright (c) 2008 Yii Software LLC
 * @license http://www.yiiframework.com/license/
 */

namespace app\commands;

use yii\console\Controller;
use Yii;

/**
 * This command echoes the first argument that you have entered.
 *
 * This command is provided as an example for you to learn how to create console commands.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */
class HelloController extends Controller
{

    /**
     * This command echoes what you have entered as the message.
     * @param string $message the message to be echoed.
     * @return int Exit code
     */

    public function actionIndex()
    {
        $faker = \Faker\Factory::create();
        $items = [];
        for ($i = 1000; $i > 0; $i--) {
            $items[] = [
                "name" => $faker->firstName(),
                "code" => $faker->lastName(),
                "min_qty" => $faker->numberBetween(10, 100),
                "avi_qty" => $faker->numberBetween(10, 100),
                "sprice" => $faker->numberBetween(100, 1000),
                "remark" => $faker->sentence,
                "expire_time" => $faker->numberBetween(10, 100),
                "cat" => $faker->date("Y-m-d H:i:s")
            ];
        }
        Yii::$app->db->createCommand()->batchInsert("itm", array_keys($items[0]), $items)->execute();
    }

    public function actionContact()
    {
        $faker = \Faker\Factory::create();
        $items = [];
        for ($i = 1000; $i > 0; $i--) {
            $items[] = [
                "name" => $faker->name(),
                "ads" => $faker->address,
                "cat" => $faker->date("Y-m-d H:i:s")
            ];
        }
        Yii::$app->db->createCommand()->batchInsert("cont", array_keys($items[0]), $items)->execute();
    }

    public function actionCustomer()
    {
        $faker = \Faker\Factory::create();
        $items = [];
        for ($i = 500; $i > 0; $i--) {
            $items[] = [
                "nam" => $faker->name(),
                "ads" => $faker->address,
                "rmk" => $faker->sentence,
                "cat" => $faker->date("Y-m-d H:i:s")
            ];
        }
        Yii::$app->db->createCommand()->batchInsert("custo", array_keys($items[0]), $items)->execute();
    }

    public function actionRoom()
    {
        $faker = \Faker\Factory::create();
        $items = [];
        for ($i = 1000; $i > 0; $i--) {
            $items[] = [
                "nam" => $faker->company,
                "ads" => $faker->address,
                "rmk" => $faker->sentence,
            ];
        }
        Yii::$app->db->createCommand()->batchInsert("stor", array_keys($items[0]), $items)->execute();
    }

    public function actionVendor()
    {
        $faker = \Faker\Factory::create();
        $items = [];
        for ($i = 1000; $i > 0; $i--) {
            $items[] = [
                "name" => $faker->company,
                "email" => $faker->email,
                "phone" => $faker->phoneNumber,
                "address" => $faker->address,
                "contact_person" => $faker->name(),
                "cat" => $faker->date("Y-m-d H:i:s")
            ];
        }
        Yii::$app->db->createCommand()->batchInsert("vend", array_keys($items[0]), $items)->execute();
    }
}
