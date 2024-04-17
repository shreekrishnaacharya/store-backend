<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;


/**
 * StoreSearch represents the model behind the search form of `app\models\Store`.
 */
class StoreSearch extends Store
{
    /**
     * {@inheritdoc}
     */
    public $skey;
    public function rules()
    {
        return [
            [['id', 'hig', 'wid', 'len', 'sts'], 'integer'],
            [['nam', 'ads', 'rmk', 'skey'], 'safe'],
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
        $query = Store::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
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
            'hig' => $this->hig,
            'wid' => $this->wid,
            'len' => $this->len,
            'sts' => $this->sts,
        ]);

        $query->andFilterWhere(['like', 'nam', $this->nam])
            ->andFilterWhere(['like', 'ads', $this->ads])
            ->andFilterWhere(['like', 'rmk', $this->rmk]);
        $query->andFilterWhere(['like', 'nam', $this->skey]);
        return $dataProvider;
    }
}
