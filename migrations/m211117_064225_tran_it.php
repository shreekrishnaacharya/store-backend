<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064225_tran_it extends Migration
{

    public function init()
    {
        $this->db = 'db';
        parent::init();
    }

    public function safeUp()
    {
        $tableOptions = 'ENGINE=InnoDB';

        $this->createTable(
            '{{%tran_it}}',
            [
                'id'=> $this->primaryKey(11),
                'ftrn'=> $this->integer(11)->notNull(),
                'fitm'=> $this->integer(11)->notNull(),
                'qty'=> $this->decimal(10, 2)->notNull(),
                'rat'=> $this->decimal(10, 2)->notNull(),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%tran_it}}');
    }
}
