<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "sales_item".
 *
 * @property int $id
 * @property int $fsal
 * @property int $fitm
 * @property float $qty
 * @property float $rate
 */
class SalesItem extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'sales_item';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fsal', 'fitm', 'qty', 'rate'], 'required'],
            [['fsal', 'fitm'], 'integer'],
            [['qty', 'rate'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'fsal' => 'Fsal',
            'fitm' => 'Fitm',
            'qty' => 'Qty',
            'rate' => 'Rate',
        ];
    }
    // public function afterSave($insert, $changedAttributes)

    // {

    //     parent::afterSave($insert, $changedAttributes);
    //     if ($this->isNewRecord) {
    //         Items::updateAllCounters(["avi_qty" => ($this->qty * -1)], ["id" => $this->fitm]);
    //     }
    // }
    public function fields()
    {
        return [
            'id' => 'id',
            'fsal',
            'name' => function ($model) {
                return $model->fkItem->name;
            },
            'qty',
            'rate'
        ];
    }

    public function getFkItem()
    {
        return $this->hasOne(Items::class, ['id' => 'fitm']);
    }
}
