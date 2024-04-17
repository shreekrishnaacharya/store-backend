<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\modules\store\models\Customers;

/**
 * CustomerSearch represents the model behind the search form of `app\models\Customers`.
 */
class CustomerSearch extends Customers
{
    /**
     * {@inheritdoc}
     */
    public $ckey;
    public function rules()
    {
        return [
            [['id', 'fcnt', 'sts'], 'integer'],
            [['nam', 'ads', 'rmk', 'ckey'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Customers::find()->joinWith(["fkContact.phones"]);

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['id' => SORT_DESC]],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere([
            'id' => $this->id,
            'fcnt' => $this->fcnt,
            'sts' => $this->sts,
        ]);

        $query->andFilterWhere(['like', 'nam', $this->nam])
            ->andFilterWhere(['like', 'ads', $this->ads])
            ->andFilterWhere(['like', 'rmk', $this->rmk]);

        $query->andFilterWhere(['like', 'nam', $this->ckey])
            ->andFilterWhere(['like', 'cont_m.cont', $this->ckey]);

        return $dataProvider;
    }
}
