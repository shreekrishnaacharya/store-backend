<div style="margin: 5px;">
    <div style="width: 100%;*zoom: 1;">
        <div style="margin:10px 0;padding: 5px;">
            <span style="margin-top:20px;margin-bottom:10px;font-family:inherit;font-weight:bold;line-height:1.1;color:#444;font-size: 18px;">Forgot your password?</span>
        </div>
    </div>
    <div style="width: 100%;*zoom: 1;">
        <div style="padding: 5px;">
            <p style="text-align:justify;">Dear <?php echo $user->name; ?>,</p>
            <p style="text-align:justify;">You have requested for password reset.<br>
                Please visit the following link in order to reset your password.<br><br>
                <a href="<?= yii\helpers\Url::to(['/site/change-password', 'id' => $user->id, 'verifyCode' => $user->f_code], true) ?>">
                    <?= yii\helpers\Url::to(['/site/change-password', 'id' => $user->id, 'verifyCode' => $user->f_code], true) ?></a>.
            </p>
            <p style="font-size: 12px;color: #777;">Note: You should use this link with in 2 hours of request for password reset.</p>
        </div>
    </div>
</div>