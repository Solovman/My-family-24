<?php

/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Family Tree');
var_dump('nice');
$APPLICATION->IncludeComponent("up:tree.list", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");
