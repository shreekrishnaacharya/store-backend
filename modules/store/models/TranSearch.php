<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Trans;

/**
 * TranSearch represents the model behind the search form of `app\models\Trans`.
 */
class TranSearch extends Trans
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'fur', 'fven', 'pty', 'sts'], 'integer'],
            [['amt', 'disc', 'vat', 'tamt'], 'number'],
            [['rmk', 'cat'], 'safe'],
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
        $query = Trans::find();

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
            'fur' => $this->fur,
            'fven' => $this->fven,
            'pty' => $this->pty,
            'amt' => $this->amt,
            'disc' => $this->disc,
            'vat' => $this->vat,
            'tamt' => $this->tamt,
            'cat' => $this->cat,
            'sts' => $this->sts,
        ]);

        $query->andFilterWhere(['like', 'rmk', $this->rmk]);

        return $dataProvider;
    }
}
