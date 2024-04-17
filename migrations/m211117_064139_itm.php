<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064139_itm extends Migration
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
            '{{%itm}}',
            [
                'id'=> $this->primaryKey(11),
                'nam'=> $this->string(100)->notNull(),
                'cod'=> $this->string(20)->notNull(),
                'cat'=> $this->timestamp()->notNull()->defaultExpression("CURRENT_TIMESTAMP"),
                'sts'=> $this->integer(11)->notNull()->defaultValue(1),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%itm}}');
    }
}
