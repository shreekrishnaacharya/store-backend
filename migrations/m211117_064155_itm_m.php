<?php

use yii\db\Schema;
use yii\db\Migration;

class m211117_064155_itm_m extends Migration
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
            '{{%itm_m}}',
            [
                'id'=> $this->primaryKey(11),
                'fitm'=> $this->integer(11)->notNull(),
                'min'=> $this->decimal(10, 2)->notNull()->defaultValue('0.00'),
                'lifet'=> $this->integer(11)->notNull()->defaultValue(0),
                'avi'=> $this->integer(11)->notNull(),
                'mtyp'=> $this->tinyInteger(4)->notNull()->defaultValue(1),
            ],$tableOptions
        );

    }

    public function safeDown()
    {
        $this->dropTable('{{%itm_m}}');
    }
}
