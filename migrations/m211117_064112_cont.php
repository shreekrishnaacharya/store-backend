<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064112_cont extends Migration
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
            '{{%cont}}',
            [
                'id'=> $this->integer(11)->notNull(),
                'nam'=> $this->string(100)->notNull(),
                'ads'=> $this->string(100)->null()->defaultValue(null),
                'sts'=> $this->tinyInteger(4)->notNull()->defaultValue(1),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%cont}}');
    }
}
