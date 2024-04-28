<?php


/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Statistics');

$APPLICATION->IncludeComponent("up:tree.statistics", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");