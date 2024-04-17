<div style="margin: 5px;">
    <div style="width: 100%;*zoom: 1;">
        <div style="margin:10px 0;padding: 5px;">
            <span style="margin-top:20px;margin-bottom:10px;font-family:inherit;font-weight:bold;line-height:1.1;color:#444;font-size: 18px;">Password changed</span>
        </div>
    </div>
    <div style="width: 100%;*zoom: 1;">
        <div style="padding: 5px;">
            <p style="text-align:justify;">Dear <?php echo $user->name; ?>,</p>
            <p style="text-align:justify;">You have successfully changed your password.<br>
                Please visit the following link to login your account with new password.<br><br>
                <a href="<?= yii\helpers\Url::to(['/site/login'], true) ?>">
                    <?= yii\helpers\Url::to(['/site/login'], true) ?></a>.
            </p>
        </div>
    </div>
</div>