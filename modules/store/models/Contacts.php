<?php

namespace app\modules\store\models;

use Yii;

/**
 * This is the model class for table "cont".
 *
 * @property int $id
 * @property string $name
 * @property string|null $ads
 * @property string|null $img
 * @property int $sts
 */
class Contacts extends \yii\db\ActiveRecord
{
    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    public $image;
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'cont';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'name'], 'required'],
            [['id', 'sts'], 'integer'],
            [['name', 'ads'], 'string', 'max' => 100],
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
            'name' => 'Name',
            'ads' => 'Address',
            'sts' => 'Status',
            'img' => 'Image',
            'image' => 'Image'
        ];
    }
    public function fields()
    {
        return [
            'id' => 'id',
            'name' => 'name',
            'create_at' => 'cat',
            'status' => 'sts',
            'address' => 'ads',
            'contacts' => 'phones',
            'image' => function () {
                return \yii\helpers\Url::to(["/image", "fc" => "contact", "contact" => $this->id, "name" => $this->img], true);
            }
        ];
    }

    public function extraFields()
    {
        return ['phones'];
    }

    public function getPhones()
    {
        return $this->hasMany(ContactMeta::class, ['fcont' => 'id']);
    }
}
