<?php

namespace app\modules\store\models;

use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\modules\store\models\Sales;

/**
 * SalesSearch represents the model behind the search form of `app\modules\store\models\Sales`.
 */
class SalesSearch extends Sales
{
    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id', 'fusr', 'fcus', 'fstore', 'pdate', 'pym_term', 'sts'], 'integer'],
            [['ref_no', 'attach', 'shipping', 'remark', 'cat'], 'safe'],
            [['pay_amt', 'amt', 'vat_rate', 'vat_amt', 'dis_per', 'dis_amt', 'total_amt'], 'number'],
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
        $query = Sales::find();

        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'sort' => ['defaultOrder' => ['pdate' => SORT_DESC]],

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
            'fusr' => $this->fusr,
            'fcus' => $this->fcus,
            'fstore' => $this->fstore,
            'pdate' => $this->pdate,
            'pay_amt' => $this->pay_amt,
            'amt' => $this->amt,
            'vat_rate' => $this->vat_rate,
            'vat_amt' => $this->vat_amt,
            'dis_per' => $this->dis_per,
            'dis_amt' => $this->dis_amt,
            'total_amt' => $this->total_amt,
            'pym_term' => $this->pym_term,
            'cat' => $this->cat,
            'sts' => $this->sts,
        ]);

        $query->andFilterWhere(['like', 'ref_no', $this->ref_no])
            ->andFilterWhere(['like', 'attach', $this->attach])
            ->andFilterWhere(['like', 'shipping', $this->shipping])
            ->andFilterWhere(['like', 'remark', $this->remark]);

        return $dataProvider;
    }
}
