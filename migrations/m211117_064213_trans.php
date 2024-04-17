<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064213_trans extends Migration
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
            '{{%trans}}',
            [
                'id'=> $this->integer(11)->notNull(),
                'fur'=> $this->integer(11)->notNull(),
                'fven'=> $this->integer(11)->notNull(),
                'pty'=> $this->integer(11)->notNull(),
                'amt'=> $this->decimal(10, 2)->notNull(),
                'disc'=> $this->decimal(10, 2)->notNull(),
                'vat'=> $this->decimal(10, 2)->notNull(),
                'tamt'=> $this->decimal(10, 2)->notNull(),
                'rmk'=> $this->text()->null()->defaultValue(null),
                'cat'=> $this->timestamp()->notNull()->defaultExpression("CURRENT_TIMESTAMP"),
                'sts'=> $this->tinyInteger(4)->notNull()->defaultValue(1),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%trans}}');
    }
}
