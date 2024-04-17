<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064203_stor extends Migration
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
            '{{%stor}}',
            [
                'id'=> $this->primaryKey(11),
                'nam'=> $this->string(100)->notNull(),
                'ads'=> $this->string(100)->notNull(),
                'rmk'=> $this->text()->notNull(),
                'hig'=> $this->tinyInteger(4)->notNull()->defaultValue(0),
                'wid'=> $this->tinyInteger(4)->notNull()->defaultValue(0),
                'len'=> $this->tinyInteger(4)->notNull()->defaultValue(0),
                'sts'=> $this->tinyInteger(4)->notNull()->defaultValue(1),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%stor}}');
    }
}
