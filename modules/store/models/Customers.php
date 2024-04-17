<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "custo".
 *
 * @property int $id
 * @property string $nam
 * @property string $ads
 * @property int $fcnt
 * @property string|null $rmk
 * @property string $cat
 * @property int $sts
 */
class Customers extends \yii\db\ActiveRecord
{
    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'custo';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['nam', 'ads'], 'required'],
            [['fcnt', 'sts'], 'integer'],
            [['rmk'], 'string'],
            [['nam', 'ads'], 'string', 'max' => 100],
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
            'nam' => 'Nam',
            'ads' => 'Ads',
            'fcnt' => 'Fcnt',
            'rmk' => 'Rmk',
            'sts' => 'Sts',
        ];
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'name' => 'nam',
            'address' => 'ads',
            'contacts' => function ($model) {
                return $model["fkContact"];
            },
            'create_at' => 'cat',
            'remark' => 'rmk',
            'status' => 'sts',
        ];
    }

    public function extraFields()
    {
        return ['bills', 'balance'];
    }

    public function getBalance()
    {
        $query = "SELECT SUM(sales_pay.amt) as pay FROM sales_pay 
        LEFT JOIN sales ON sales.id=sales_pay.fsal WHERE sales.fcus=" . $this->id;
        $paid = Yii::$app->db->createCommand($query)->queryOne();
        $query = "SELECT SUM(total_amt) as due FROM sales WHERE sales.fcus=" . $this->id;
        $due = Yii::$app->db->createCommand($query)->queryOne();
        return $due["due"] - $paid["pay"];
    }

    public function getFkContact()
    {
        return $this->hasOne(Contacts::class, ['id' => 'fcnt']);
    }

    public function getBills()
    {
        return $this->hasMany(Sales::class, ['fcus' => 'id']);
    }
}
