<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "tran_it".
 *
 * @property int $id
 * @property int $ftrn
 * @property int $fitm
 * @property float $qty
 * @property float $rat
 */
class TranItem extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'tran_it';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['ftrn', 'fitm', 'qty', 'rat'], 'required'],
            [['ftrn', 'fitm'], 'integer'],
            [['qty', 'rat'], 'number'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'ftrn' => 'Ftrn',
            'fitm' => 'Fitm',
            'qty' => 'Qty',
            'rat' => 'Rat',
        ];
    }
}
