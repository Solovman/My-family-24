<?php

/**
 * @var CMain $APPLICATION
 */


define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Family tree');

$APPLICATION->IncludeComponent("up:tree.main", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");