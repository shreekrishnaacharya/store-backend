<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\modules\store\models\Items;

/**
 * ItemSearch represents the model behind the search form of `app\models\Items`.
 */
class ItemSearch extends Items
{
    /**
     * {@inheritdoc}
     */
    public $ikey;
    public function rules()
    {
        return [
            [['id', 'sts'], 'integer'],
            [['name', 'code', 'cat', 'ikey'], 'safe'],
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
        $query = Items::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['id' => SORT_DESC]],
            // 'pagination' => false
            'pagination' => [
                'pageSize' => 10,
            ],
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
            'cat' => $this->cat,
            'sts' => $this->sts,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'code', $this->code]);
        $query->andFilterWhere(['like', 'name', $this->ikey])
            ->orFilterWhere(['like', 'code', $this->ikey]);

        return $dataProvider;
    }
}
