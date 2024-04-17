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
        <p style="text-align:justify;">Dear <?= $user->name; ?>,</p>
        <p style="text-align:justify;">Your account has been created at <?= Yii::$app->params["sitename"] ?>.<br>
            Your login detail are as follow :<br>
            USERNAME : <b><?= $user->email; ?></b><br>
            PASSWORD : <b><?= $password; ?></b><br>
            Click in the following link to verify your account.</p>
        <a href="<?= yii\helpers\Url::to(['/site/validate', 'id' => $user->id, 'verifyCode' => $user->authKey], true) ?>"><?= yii\helpers\Url::to(['/site/verify', 'id' => $user->id, 'verifyCode' => $user->authKey], true) ?></a>
        <p>Please change your password as soon as you login into the system.</p>
    </div>
</div>