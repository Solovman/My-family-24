<?php


/**
 * @var CMain $APPLICATION
 */


define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Search relatives');

$APPLICATION->IncludeComponent("up:tree.search", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");