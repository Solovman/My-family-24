<?php

global $USER;

/**
 * @var CMain $APPLICATION
 */

define('NEED_AUTH', true);

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/header.php");

if ($USER->IsAdmin())
{
	$APPLICATION->SetTitle('Admin');

	$APPLICATION->IncludeComponent("up:tree.admin", "", []);
}

require($_SERVER['DOCUMENT_ROOT'] . "/bitrix/footer.php");