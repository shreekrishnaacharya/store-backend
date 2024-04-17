<?php

namespace app\modules\store\models;

use app\models\User;
use Yii;

/**
 * This is the model class for table "sales_pay".
 *
 * @property int $id
 * @property int $fusr
 * @property int $fsal
 * @property float $amt
 * @property string $cat
 */
class SalesPay extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'sales_pay';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fusr', 'fsal', 'amt'], 'required'],
            [['fusr', 'fsal'], 'integer'],
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
            'fsal' => 'Fsal',
            'amt' => 'Amt',
            'cat' => 'Cat',
        ];
    }
    public function fields()
    {
        return [
            'id' => 'id',
            'name' => function ($model) {
                return $model->fkUser->name;
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
