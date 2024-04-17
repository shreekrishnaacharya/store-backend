<?php

namespace app\modules\store\models;

use Yii;
use yii\rbac\Item;

/**
 * This is the model class for table "purchase_item".
 *
 * @property int $id
 * @property int $fpur
 * @property int $fitm
 * @property float $qty
 * @property float $rate
 */
class PurchaseItem extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'purchase_item';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'fpur', 'fitm', 'qty', 'rate'], 'required'],
            [['id', 'fpur', 'fitm'], 'integer'],
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
            'fpur' => 'Fpur',
            'fitm' => 'Fitm',
            'qty' => 'Qty',
            'rate' => 'Rate',
        ];
    }

    public function fields()
    {
        return [
            'id',
            'fitm',
            'name' => function ($model) {
                return $model->fkItem?->name;
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
