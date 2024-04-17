<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "vend".
 *
 * @property int $id
 * @property string $name
 * @property string $address
 * @property string $phone
 * @property string $email
 * @property string $contact_person
 * @property int $status
 */
class Vend extends \yii\db\ActiveRecord
{
    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    const SCENARIO_LIST = 'list';
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'vend';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'address',  'contact_person'], 'required'],
            [['status'], 'integer'],
            [['name', 'address', 'phone', 'email', 'contact_person'], 'string', 'max' => 100],
            [['cat'], 'safe'],
        ];
    }

    public function scenarios()
    {
        $scenarios = parent::scenarios();
        $scenarios[self::SCENARIO_LIST] = ['id', 'name', 'address', 'phone', 'contact_person'];
        return $scenarios;
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'address' => 'Address',
            'phone' => 'Phone',
            'email' => 'Email',
            'contact_person' => 'Contact Person',
            'create_at' => 'Create At',
            'status' => 'Status',
        ];
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'name' => 'name',
            'address' => 'address',
            'contact_person' => 'contact_person',
            'contacts' => function ($model) {
                return $model["fkContact"];
            },
            'create_at' => 'cat',
            'status' => 'status'
        ];
    }
    public function extraFields()
    {
        return ['bills', 'balance'];
    }

    public function getBalance()
    {
        $query = "SELECT SUM(purchase_pay.amt) as pay FROM purchase_pay 
        LEFT JOIN purchase ON purchase.id=purchase_pay.fpur WHERE purchase.fvend=" . $this->id;
        $paid = Yii::$app->db->createCommand($query)->queryOne();
        $query = "SELECT SUM(total_amt) as due FROM purchase WHERE purchase.fvend=" . $this->id;
        $due = Yii::$app->db->createCommand($query)->queryOne();
        return $due["due"] - $paid["pay"];
    }

    public function getFkContact()
    {
        return $this->hasOne(Contacts::class, ['id' => 'fcnt']);
    }

    public function getBills()
    {
        return $this->hasMany(Purchase::class, ['fvend' => 'id']);
    }
}
