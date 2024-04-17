<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\modules\store\models\Vend;

/**
 * VendSearch represents the model behind the search form of `app\models\Vend`.
 */
class VendSearch extends Vend
{
    /**
     * {@inheritdoc}
     */
    public $vkey;
    public function rules()
    {
        return [
            [['id', 'status'], 'integer'],
            [['name', 'address', 'contact_person', 'vkey'], 'safe'],
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
        $query = Vend::find()->joinWith(["fkContact.phones"]);

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
            'status' => $this->status,
        ]);

        $query->andFilterWhere(['like', 'name', $this->name])
            ->andFilterWhere(['like', 'address', $this->address])
            ->andFilterWhere(['like', 'contact_person', $this->contact_person]);
        $query->andFilterWhere(['like', 'name', $this->vkey])
            ->orFilterWhere(['like', 'contact_person', $this->vkey]);

        return $dataProvider;
    }
}
