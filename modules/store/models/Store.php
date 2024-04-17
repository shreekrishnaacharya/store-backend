<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "stor".
 *
 * @property int $id
 * @property string $nam
 * @property string $ads
 * @property string $rmk
 * @property int $hig
 * @property int $wid
 * @property int $len
 * @property int $sts
 */
class Store extends \yii\db\ActiveRecord
{
    const SCENARIO_CREATE = 'create';
	const SCENARIO_UPDATE = 'update';
    /**
     * {@inheritdoc}
     */
    public $skey;
    public static function tableName()
    {
        return 'stor';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nam', 'ads', 'rmk'], 'required'],
            [['rmk'], 'string'],
            [['hig', 'wid', 'len', 'sts'], 'integer'],
            [['nam', 'ads'], 'string', 'max' => 100],
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
            'ads' => 'Ads',
            'rmk' => 'Rmk',
            'hig' => 'Hig',
            'wid' => 'Wid',
            'len' => 'Len',
            'sts' => 'Sts',
        ];
    }
}
