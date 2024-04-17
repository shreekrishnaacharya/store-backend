<?php
/* @var $this \yii\web\View */
/* @var $content string */

use yii\helpers\Html;
use app\assets\AppAsset;
use yii\helpers\Url;

AppAsset::register($this);
$this->beginPage();
?>
<?php $this->beginBody();
echo $content;
$this->endBody();
?>