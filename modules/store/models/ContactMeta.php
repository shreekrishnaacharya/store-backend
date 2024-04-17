<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "cont_m".
 *
 * @property int $id
 * @property int $fcont
 * @property int $typ
 * @property string $cont
 */
class ContactMeta extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    const TYPE_MOBILE = "Mobile";
    const TYPE_HOME = "Home";
    const TYPE_WORK = "Work";

    public static function tableName()
    {
        return 'cont_m';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['fcont', 'cont', 'typ'], 'required'],
            [['fcont'], 'integer'],
            [['cont'], 'string', 'max' => 100],
            [['typ'], 'string', 'max' => 10],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'fcont' => 'Fcont',
            'typ' => 'Type',
            'cont' => 'Phone',
        ];
    }

    public function fields()
    {
        return [
            'type' => 'typ',
            'phone' => 'cont',
        ];
    }
}
