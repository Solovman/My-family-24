<?php

use Bitrix\Main\Application;
use Bitrix\Main\DB\Connection;
use Bitrix\Main\Request;
use Bitrix\Main\Web\Uri;
use Up\Tree\Model\UserSubscriptionTable;

function request(): Request
{
	return Application::getInstance()->getContext()->getRequest();
}

function db(): Connection
{
	return Application::getConnection();
}

function OnBeforeUserRegisterHandler(&$arFields): void
{
	if (empty($arFields['CONFIRM_PASSWORD']))
	{
		$arFields['CONFIRM_PASSWORD'] = $arFields['PASSWORD'];
	}
}

function OnAfterUserRegisterHandler(): void
{
	global $USER, $APPLICATION;
	$userId = (int) $USER->GetID();
	UserSubscriptionTable::add(['USER_ID' => $userId]);
	$request = \request();
	$uriString = $request->getRequestUri();

	$uri = new Uri($uriString);
	$uri->deleteParams(['register']);

	$newUriString = $uri->getUri();
	LocalRedirect($newUriString);
}

AddEventHandler("main", "OnBeforeUserRegister", "OnBeforeUserRegisterHandler");

AddEventHandler("main", "OnAfterUserRegister", "OnAfterUserRegisterHandler");

if (file_exists(__DIR__ . '/module_updater.php'))
{
	include(__DIR__ . '/module_updater.php');
}

