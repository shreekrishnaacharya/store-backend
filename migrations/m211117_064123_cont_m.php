<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064123_cont_m extends Migration
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
            '{{%cont_m}}',
            [
                'id'=> $this->primaryKey(11),
                'fcont'=> $this->integer(11)->notNull(),
                'typ'=> $this->tinyInteger(4)->notNull()->defaultValue(1),
                'cont'=> $this->string(100)->notNull(),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%cont_m}}');
    }
}
