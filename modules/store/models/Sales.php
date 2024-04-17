<?php

namespace app\modules\store\models;

use app\models\User;
use Yii;

/**
 * This is the model class for table "sales".
 *
 * @property int $id
 * @property int $fusr
 * @property int $fcus
 * @property int $fstore
 * @property int $pdate
 * @property string|null $ref_no
 * @property string|null $attach
 * @property float $pay_amt
 * @property float $amt
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
class Sales extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    const STATUS_PENDING = 0;
    const STATUS_ORDER = 1;
    const STATUS_DELIVERED = 2;
    const STATUS_RETURN = 3;

    public $attachfile, $ptdate, $items;
    public static function tableName()
    {
        return 'sales';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fusr', 'fcus', 'fstore', 'pdate', 'pym_term', 'sts', 'items'], 'required'],
            [['fusr', 'fcus', 'fstore', 'pdate', 'pym_term', 'sts', 'tid'], 'integer'],
            [['pay_amt', 'amt', 'vat_rate', 'vat_amt', 'dis_per', 'dis_amt', 'total_amt'], 'number'],
            [['remark'], 'string'],
            [['cat', 'attachfile', 'ptdate'], 'safe'],
            [['ref_no'], 'string', 'max' => 50],
            [['attach', 'shipping'], 'string', 'max' => 200],
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
            'fcus' => 'Fcus',
            'fstore' => 'Fstore',
            'pdate' => 'Pdate',
            'ref_no' => 'Ref No',
            'attach' => 'Attach',
            'pay_amt' => 'Pay Amt',
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
        if ($this->isNewRecord) {
            Items::updateItems(array_column($this->items, "itemid"));
        }
        parent::afterSave($insert, $changedAttributes);
    }

    public function beforeDelete()
    {
        $items = $this->getSitems()->asArray()->all();
        $iid = [];
        foreach ($items as $it) {
            $iid[] = $it["fitm"];
        }
        PurchaseItem::deleteAll(["fsal", $this->id]);
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
            'customer' => function ($model) {
                return $model->fkCustomer?->nam;
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
            'dis_amt',
            'rchg',
        ];
    }

    public function extraFields()
    {
        return ['sitems', "payments"];
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

    public function getSitems()
    {
        return $this->hasMany(SalesItem::class, ['fsal' => 'id']);
    }

    public function getPayments()
    {
        return $this->hasMany(SalesPay::class, ['fsal' => 'id']);
    }

    public function getFkCustomer()
    {
        return $this->hasOne(Customers::class, ['id' => 'fcus']);
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
