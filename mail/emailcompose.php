<?php
/* @var $this yii\web\View */
?>
<div style="width: 100%;*zoom: 1;">
    <div style="margin:10px 0;padding: 5px;">
        <div style="margin-top:20px;text-align: center;margin-bottom:10px;font-family:inherit;font-weight:bold;line-height:0.9;color:#2196f3;">
            <p style="font-size:18px"><?= Yii::$app->params["sitname"] ?></p>
            <p style="font-size:14px;color:#777"><?= Yii::$app->params["address"] ?></p>
            <p style="font-size:12px;color:#777">Contact : <?= Yii::$app->params["contact"] ?></p>
        </div>
    </div>
</div>
<div style="width: 100%;*zoom: 1;">
    <div style="padding: 5px;">
        <p style="text-align:justify;"><?= $message ?></p>
    </div>
</div>