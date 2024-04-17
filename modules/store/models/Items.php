<?php

namespace app\modules\store\models;

use Yii;
use yii\helpers\Url;

/**
 * This is the model class for table "itm".
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string $img
 * @property string $cat
 * @property int $sts
 */
class Items extends \yii\db\ActiveRecord
{
    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    public $image, $vendor;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'itm';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'code'], 'required'],
            [['cat', 'vendor'], 'safe'],
            [['sts'], 'integer'],
            [['min_qty', 'expire_time'], 'number', 'min' => 1],
            [['avi_qty', 'sprice', 'qty_typ'], 'number'],
            [['name'], 'string', 'max' => 10],
            [['code'], 'string', 'max' => 20],
            [['img'], 'string', 'max' => 200],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'code' => 'Code',
            'cat' => 'Create At',
            'sts' => 'Status',
            'img' => 'Image'
        ];
    }
    public function fields()
    {
        return [
            'id' => 'id',
            'name' => 'name',
            'code' => 'code',
            'create_at' => 'cat',
            'status' => 'sts',
            'expire_time' => 'expire_time',
            'avi_qty' => 'avi_qty',
            'min_qty' => 'min_qty',
            'sprice' => 'sprice',
            'qty_typ' => 'qty_typ',
            'image' => function () {
                return Url::to(["/image", "fc" => "item", "item" => $this->id, "name" => $this->img], true);
            }
        ];
    }

    public function extraFields()
    {
        return ['vends'];
    }

    static public function updateItems($ids)
    {
        if (count($ids) == 0) {
            return false;
        }
        $query = "UPDATE itm LEFT JOIN (
            SELECT 
            SUM(IF(sts=3,0,qty)) as pur_qty,
            SUM(IF(sts=3,qty,0)) as pret_qty,
            purchase_item.fitm as itmid
            FROM purchase 
            LEFT JOIN purchase_item ON purchase_item.fpur=purchase.id 
            WHERE purchase_item.fitm IN (" . implode($ids) . ")
            GROUP BY purchase_item.fitm)as t1 ON t1.itmid=itm.id 
            LEFT JOIN (SELECT 
            SUM(IF(sts=3,0,qty)) as sal_qty,
            SUM(IF(sts=3,qty,0)) as sret_qty,
            sales_item.fitm as itmid
            FROM sales
            LEFT JOIN sales_item ON sales_item.fsal=sales.id
            WHERE sales_item.fitm IN (" . implode($ids) . ")
            GROUP BY sales_item.fitm)as t2 ON t2.itmid=itm.id 
            SET avi_qty=(pur_qty-pret_qty-sal_qty+sret_qty)
            WHERE itm.id=t1.itmid";
        return Yii::$app->db->createCommand($query)->execute();
    }

    public function getVends()
    {
        return $this->hasMany(ItemVend::class, ['fk_item_id' => 'id']);
    }
}
