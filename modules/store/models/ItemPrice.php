<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "item_price".
 *
 * @property int $id
 * @property int $fk_item_id
 * @property float $price
 * @property string $cat
 */
class ItemPrice extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'itm_price';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'fk_item_id', 'price'], 'required'],
            [['id', 'fk_item_id'], 'integer'],
            [['price'], 'number'],
            [['cat'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'fk_item_id' => 'Fk Item ID',
            'price' => 'Price',
            'cat' => 'Cat',
        ];
    }
}
