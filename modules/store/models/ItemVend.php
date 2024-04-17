<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "itm_vend".
 *
 * @property int $id
 * @property int $fk_item_id
 * @property int $fk_vend_id
 * @property float $sp
 * @property int $sts
 */
class ItemVend extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'itm_vend';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fk_item_id', 'fk_vend_id', 'sp'], 'required'],
            [['fk_item_id', 'fk_vend_id', 'sts'], 'integer'],
            [['sp'], 'number'],
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
            'fk_vend_id' => 'Fk Vend ID',
            'sp' => 'Sp',
            'sts' => 'Sts',
        ];
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'name' => function ($model) {
                return $model->fkVend?->name;
            },
            'vid' => 'fk_vend_id',
            'price' => 'sp',
        ];
    }

    public function extraFields()
    {
        return ['fkVend', 'fkItem'];
    }

    public function getFkItem()
    {
        return $this->hasOne(Items::class, ['id' => 'fk_item_id']);
    }

    public function getFkVend()
    {
        return $this->hasOne(Vend::class, ['id' => 'fk_vend_id']);
    }
}
