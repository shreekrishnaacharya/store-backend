<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\modules\store\models\Contacts;

/**
 * ContactSearch represents the model behind the search form of `app\models\Contacts`.
 */
class ContactSearch extends Contacts
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'sts'], 'integer'],
            [['name', 'ads'], 'safe'],
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
        $query = Contacts::find();

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
            'sts' => $this->sts,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'ads', $this->ads]);

        return $dataProvider;
    }
}
