<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064231_unit extends Migration
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
            '{{%unit}}',
            [
                'id'=> $this->primaryKey(11),
                'nam'=> $this->string(100)->notNull(),
                'typ'=> $this->integer(11)->notNull(),
                'vlu'=> $this->decimal(10, 2)->notNull(),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%unit}}');
    }
}
