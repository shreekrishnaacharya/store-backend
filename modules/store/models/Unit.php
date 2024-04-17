<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "unit".
 *
 * @property int $id
 * @property string $nam
 * @property int $typ
 * @property float $vlu
 */
class Unit extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'unit';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nam', 'typ', 'vlu'], 'required'],
            [['typ'], 'integer'],
            [['vlu'], 'number'],
            [['nam'], 'string', 'max' => 100],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nam' => 'Nam',
            'typ' => 'Typ',
            'vlu' => 'Vlu',
        ];
    }
}
