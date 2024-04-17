<?php

namespace app\modules\store\models;

use app\models\User;
use Yii;

/**
 * This is the model class for table "purchase_pay".
 *
 * @property int $id
 * @property int $fusr
 * @property int $fpur
 * @property float $amt
 * @property string $cat
 */
class PurchasePay extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'purchase_pay';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fusr', 'amt', 'fpur'], 'required'],
            [['fusr', 'fpur'], 'integer'],
            [['amt'], 'number'],
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
            'fusr' => 'Fusr',
            'amt' => 'Amt',
            'fpur' => 'Pur',
            'cat' => 'Cat',
        ];
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'name' => function ($model) {
                return $model->fkUser?->name;
            },
            'amt',
            'cat'
        ];
    }

    public function getFkUser()
    {
        return $this->hasOne(User::class, ['id' => 'fusr']);
    }
}
