<?php

/**
 * @var CMain $APPLICATION
 */

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");
$APPLICATION->SetTitle('Family Tree');

$APPLICATION->IncludeComponent('up:system.auth.form', '', []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");
