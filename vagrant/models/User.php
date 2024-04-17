<?php

namespace app\models;

use Yii;
use yii\behaviors\TimestampBehavior;
use yii\db\Expression;
use yii\web\IdentityInterface;

/**
 * This is the model class for table "user".
 *
 * @property int $id
 * @property string|null $name
 * @property string $gender
 * @property string $contact
 * @property string $ads
 * @property string $img
 * @property string|null $email
 * @property string|null $auth_key
 * @property string|null $access_token
 * @property string|null $passw
 * @property string|null $f_code
 * @property int|null $f_date
 * @property int|null $f_sts
 * @property string $sts
 * @property string $cat
 * @property string $uat
 */
class User extends \yii\db\ActiveRecord implements IdentityInterface
{
    public $passwd = '', $cpasswd = '', $oldpasswd = '';

    /**
     * Constants
     */
    const SCENARIO_CREATE = 'create';
    const SCENARIO_UPDATE = 'update';
    const SCENARIO_PUPDATE = 'pupdate';
    const GENDER_MALE = "M";
    const GENDER_FEMALE = "F";
    const sts_ACTIVE = 'active';
    const sts_INACTIVE = 'inactive';
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'user';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'email', 'passwd', 'gender'], 'required'],
            [['f_date', 'f_sts'], 'integer'],
            ['email', 'unique'],
            ['email', 'email'],
            [['cat', 'uat'], 'safe'],
            [['name'], 'string', 'max' => 100],
            [['gender'], 'string', 'max' => 6],
            [['contact'], 'string', 'max' => 10],
            [['ads', 'img'], 'string', 'max' => 200],
            [['email'], 'string', 'max' => 150],
            [['auth_key', 'access_token', 'password'], 'string', 'max' => 50],
            [['f_code'], 'string', 'max' => 32],
            [['sts'], 'string', 'max' => 20],
            // [['name', 'gender', 'contact', 'ads'], 'on' => self::SCENARIO_UPDATE],
            // [['passwd', 'cpasswd', 'oldpasswd'], 'on' => self::SCENARIO_PUPDATE]
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
            'gender' => 'Gender',
            'contact' => 'Contact',
            'ads' => 'Ads',
            'email' => 'Email',
            'auth_key' => 'Auth Key',
            'access_token' => 'Access Token',
            'passw' => 'Passw',
            'f_code' => 'F Code',
            'f_date' => 'F Date',
            'f_sts' => 'F Sts',
            'sts' => 'Sts',
            'cat' => 'Cat',
            'uat' => 'Uat',
        ];
    }


    public function fields()
    {
        return [
            'id' => 'id',
            'name' => 'name',
            'gender' => 'gender',
            'address' => 'ads',
            'email' => 'email',
            'create_at' => 'cat',
            'update_at' => 'uat',
        ];
    }

    // public function behaviors()
    // {
    //     $behaviors = parent::behaviors();

    //     // auto fill timestamp columns.
    //     if ($this->hasAttribute('cat') || $this->hasAttribute('uat')) {
    //         $behavior = [
    //             'class' => TimestampBehavior::class,
    //             'value' => new Expression('NOW()'),
    //         ];
    //         if ($this->hasAttribute('uat')) {
    //             $behavior['updatedAtAttribute'] = 'uat';
    //         } else {
    //             $behavior['updatedAtAttribute'] = null;
    //         }
    //         $behaviors[] = $behavior;
    //     }
    //     return $behaviors;
    // }

    public function beforeSave($insert)
    {
        if ($this->isNewRecord) {
            if ($this->access_token == null) {
                $this->access_token = Yii::$app->security->generateRandomString(30);
            }
        }

        if (!empty($this->passwd)) {
            $this->password = static::hashPassword($this->passwd);
        }
        return true;
    }


    /**
     * @param int|string $user_id
     *
     * @return User|IdentityInterface|null
     */
    public static function findIdentity($user_id)
    {
        return static::findOne($user_id);
    }

    /**
     * @param mixed $token
     * @param null $type
     *
     * @return User|IdentityInterface|null
     */
    public static function findIdentityByAccessToken($token, $type = null)
    {
        return static::findOne(['access_token' => $token, 'sts' => 'active']);
    }

    /**
     * @param $email
     *
     * @return User|null
     */
    public static function findByEmail($email)
    {
        return static::findOne(['email' => $email]);
    }

    /**
     * @param $name
     *
     * @return User|null
     */
    public static function findByUsername($name)
    {
        return static::findOne(['email' => $name]);
    }

    /**
     * @param $key
     *
     * @return User|null
     */
    public static function findByPasswordResetKey($key)
    {
        return static::findOne(['f_code' => $key, 'sts' => 'active']);
    }

    /**
     * @return int|string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getAuthKey()
    {
        return $this->auth_key;
    }

    /**
     * @param string $authKey
     *
     * @return bool
     */
    public function validateAuthKey($authKey)
    {
        return $this->getAuthKey() === $authKey;
    }

    /**
     * @param $password
     *
     * @return bool
     */
    public function validatePassword($password)
    {
        return static::hashPassword($password) === $this->password;
    }

    public function validateOldPassword($password)
    {
        return static::hashPassword($password) === $this->password;
    }

    /**
     * @param $password
     *
     * @return string
     * @throws \yii\base\Exception
     */
    public static function hashPassword($password)
    {
        return md5($password);
    }
}
