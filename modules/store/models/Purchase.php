<?php

namespace app\modules\store\models;

use app\models\User;
use Yii;

/**
 * This is the model class for table "purchase".
 *
 * @property int $id
 * @property int $fusr
 * @property int $fvend
 * @property int $fstore
 * @property int $pdate
 * @property string|null $ref_no
 * @property string|null $attach
 * @property float|null $amt
 * @property float $vat_rate
 * @property float $vat_amt
 * @property float $dis_per
 * @property float $dis_amt
 * @property float $total_amt
 * @property string|null $shipping
 * @property int $pym_term
 * @property string|null $remark
 * @property string $cat
 * @property int $sts
 */
class Purchase extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    const STATUS_PENDING = 0;
    const STATUS_ORDER = 1;
    const STATUS_RECEIVED = 2;
    const STATUS_RETURN = 3;

    public $attachfile, $ptdate, $items;
    public static function tableName()
    {
        return 'purchase';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fusr', 'fvend', 'fstore', 'pdate', 'pym_term', 'items', 'sts'], 'required'],
            [['fusr', 'fvend', 'fstore', 'pdate', 'pym_term', 'sts', 'tid'], 'integer'],
            [['has_return', 'rchg', 'amt', 'vat_rate', 'vat_amt', 'dis_per', 'dis_amt', 'total_amt'], 'number'],
            [['remark'], 'string'],
            [['cat', 'attachfile', 'ptdate'], 'safe'],
            [['ref_no'], 'string', 'max' => 50],
            [['shipping', 'attach'], 'string', 'max' => 200],
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
            'fvend' => 'Fvend',
            'fstore' => 'Fstore',
            'pdate' => 'Pdate',
            'ref_no' => 'Ref No',
            'attach' => 'Attach',
            'amt' => 'Amt',
            'vat_rate' => 'Vat Rate',
            'vat_amt' => 'Vat Amt',
            'dis_per' => 'Dis Per',
            'dis_amt' => 'Dis Amt',
            'total_amt' => 'Total Amt',
            'shipping' => 'Shipping',
            'pym_term' => 'Pym Term',
            'remark' => 'Remark',
            'cat' => 'Cat',
            'sts' => 'Sts',
        ];
    }

    public function afterSave($insert, $changedAttributes)
    {
        if ($insert) {
            Items::updateItems(array_column($this->items, "itemid"));
        }
        parent::afterSave($insert, $changedAttributes);
    }

    public function beforeDelete()
    {
        $items = $this->getPitems()->asArray()->all();
        $iid = [];
        foreach ($items as $it) {
            $iid[] = $it["fitm"];
        }
        SalesItem::deleteAll(["fsal", $this->id]);
        Items::updateItems($iid);
        parent::beforeDelete();
    }

    public function fields()
    {
        return [
            'id' => 'id',
            'date' => function ($model) {
                return date("Y-m-d", $model->pdate);
            },
            'create_at' => 'cat',
            'status' => 'sts',
            'total_amt' => 'total_amt',
            'ref_no' => 'ref_no',
            'pay_amt' => 'pay_amt',
            'pstatus' => function ($model) {
                if ($model->pay_amt == 0) {
                    return 0;
                } elseif ($model->pay_amt == $model->total_amt) {
                    return 2;
                }
                return 1;
            },
            'vend' => function ($model) {
                return $model->fkVend?->name;
            },
            'shipping',
            'pym_term',
            'create_by' =>  function ($model) {
                return $model->fkUser?->name;
            },
            'store' =>  function ($model) {
                return $model->fkStore?->nam;
            },
            'create_at' => 'cat',
            'has_return',
            'attach',
            'amt',
            'vat_rate',
            'vat_amt',
            'dis_per',
            'rchg',
            'dis_amt'
        ];
    }

    public function extraFields()
    {
        return ['pitems', "payments"];
    }

    public static function getStatusList()
    {
        return [
            ["id" => 0, "name" => "Pending"],
            ["id" => 1, "name" => "Ordered"],
            ["id" => 2, "name" => "Received"],
            ["id" => 3, "name" => "Return"],
        ];
    }

    public function getPitems()
    {
        return $this->hasMany(PurchaseItem::class, ['fpur' => 'id']);
    }

    public function getPayments()
    {
        return $this->hasMany(PurchasePay::class, ['fpur' => 'id']);
    }

    public function getFkVend()
    {
        return $this->hasOne(Vend::class, ['id' => 'fvend']);
    }



    public function getFkUser()
    {
        return $this->hasOne(User::class, ['id' => 'fusr']);
    }
    public function getFkStore()
    {
        return $this->hasOne(Store::class, ['id' => 'fstore']);
    }
}
