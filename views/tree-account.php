<?php

/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('My account');

$APPLICATION->IncludeComponent("bitrix:main.profile", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");