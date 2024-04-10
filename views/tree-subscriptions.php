<?php

/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Family Tree');

$APPLICATION->IncludeComponent("up:tree.subscriptions", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");