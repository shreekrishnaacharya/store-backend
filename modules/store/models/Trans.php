<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "trans".
 *
 * @property int $id
 * @property int $fur
 * @property int $fven
 * @property int $pty
 * @property float $amt
 * @property float $disc
 * @property float $vat
 * @property float $tamt
 * @property string|null $rmk
 * @property string $cat
 * @property int $sts
 */
class Trans extends \yii\db\ActiveRecord
{

    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'trans';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'fur', 'fven', 'pty', 'amt', 'disc', 'vat', 'tamt'], 'required'],
            [['id', 'fur', 'fven', 'pty', 'sts'], 'integer'],
            [['amt', 'disc', 'vat', 'tamt'], 'number'],
            [['rmk'], 'string'],
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
            'fur' => 'Fur',
            'fven' => 'Fven',
            'pty' => 'Pty',
            'amt' => 'Amt',
            'disc' => 'Disc',
            'vat' => 'Vat',
            'tamt' => 'Tamt',
            'rmk' => 'Rmk',
            'cat' => 'Cat',
            'sts' => 'Sts',
        ];
    }
}
