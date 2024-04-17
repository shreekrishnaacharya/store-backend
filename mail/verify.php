<?php
/* @var $this yii\web\View */
?>
<div style="width: 100%;*zoom: 1;">
    <div style="margin:10px 0;padding: 5px;">
        <span style="margin-top:20px;margin-bottom:10px;font-family:inherit;font-weight:bold;line-height:1.1;color:#444;font-size: 18px;">Welcome to <?= Yii::$app->params["sitename"] ?></span><br><br>
    </div>
</div>
<div style="width: 100%;*zoom: 1;">
    <div style="padding: 5px;">
        <p style="text-align:justify;">Dear <?php echo $user->name; ?>,</p>
        <p style="text-align:justify;">You have requested for account verification code.<br>
            Click in the following link to verify your account.</p>
        <a href="<?= yii\helpers\Url::to(['/site/validate', 'id' => $user->id, 'verifyCode' => $user->authKey], true) ?>"><?= yii\helpers\Url::to(['/site/verify', 'id' => $user->id, 'verifyCode' => $user->authKey], true) ?></a>
        <p>OR</p>
        <p>Enter following verification code: <b><?= $user->authKey ?></b></p>
    </div>
</div>