<?php

/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

$APPLICATION->SetTitle('Chats');

$APPLICATION->IncludeComponent("up:tree.chats", "", []);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");