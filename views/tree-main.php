<?php

/**
 * @var CMain $APPLICATION
 */

use Bitrix\Main\Context;

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Family Tree');

$APPLICATION->IncludeComponent("up:tree.main", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");