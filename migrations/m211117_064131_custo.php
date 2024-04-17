<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064131_custo extends Migration
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
            '{{%custo}}',
            [
                'id'=> $this->primaryKey(11),
                'nam'=> $this->string(100)->notNull(),
                'ads'=> $this->string(100)->notNull(),
                'fcnt'=> $this->integer(11)->notNull(),
                'rmk'=> $this->text()->null()->defaultValue(null),
                'sts'=> $this->tinyInteger(4)->notNull()->defaultValue(1),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%custo}}');
    }
}
