<?php

/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Messages');

$APPLICATION->IncludeComponent("up:tree.messages", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");