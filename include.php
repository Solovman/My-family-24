<?php

//require 'vendor/autoload.php';

use Bitrix\Main\Application;
use Bitrix\Main\DB\Connection;
use Bitrix\Main\Request;
use Bitrix\Main\Web\Uri;
use Up\Tree\Model\UserSubscriptionTable;


//$text1 = "Karina Demchinko";
//
//$text2 = "Karina Demchenko";
//
//$simhash = new \Tga\SimHash\SimHash();
//$extractor = new \Tga\SimHash\Extractor\SimpleTextExtractor();
//$comparator = new Tga\SimHash\Comparator\GaussianComparator(1);
//
//$fp1 = $simhash->hash($extractor->extract($text1), \Tga\SimHash\SimHash::SIMHASH_32);
//$fp2 = $simhash->hash($extractor->extract($text2), \Tga\SimHash\SimHash::SIMHASH_32);

//var_dump($fp1->getBinary());
//var_dump($fp2->getBinary());
//
//var_dump($comparator->compare($fp1, $fp2));


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

	if(empty($args['LOGIN']))
	{
		$arFields['LOGIN'] = $arFields['EMAIL'];
	}
}

function DoBeforeUserLoginHandler(&$arFields): void
{
	$userLogin = $_POST["USER_LOGIN"];
	if (isset($userLogin))
	{
		$isEmail = strpos($userLogin,"@");
		if ($isEmail>0)
		{
			$arFilter = Array("EMAIL"=>$userLogin);
			$rsUsers = CUser::GetList(($by="id"), ($order="desc"), $arFilter);
			if($res = $rsUsers->Fetch())
			{
				if($res["EMAIL"]==$arFields["LOGIN"])
					$arFields["LOGIN"] = $res["LOGIN"];
			}
		}
	}
}

function OnAfterUserRegisterHandler(&$arFields): void
{
	if ($arFields['USER_ID'] > 0) {
		global $USER;
		$userId = (int) $USER->GetID();
		UserSubscriptionTable::add(['USER_ID' => $userId]);
		$request = \request();
		$uriString = $request->getRequestUri();

		$uri = new Uri($uriString);
		$uri->deleteParams(['register']);

		$newUriString = $uri->getUri();
		LocalRedirect($newUriString);
	}
}

function OnBeforeUserUpdateHandler(&$arFields)
{
	global $USER;
	if (empty($arFields['NAME']))
	{
		$arFields['NAME'] = $USER->GetFirstName();
	}
	if (empty($arFields['LAST_NAME']))
	{
		$arFields['LAST_NAME'] = $USER->GetLastName();
	}
}

AddEventHandler("main", "OnBeforeUserRegister", "OnBeforeUserRegisterHandler");

AddEventHandler("main", "OnAfterUserRegister", "OnAfterUserRegisterHandler");

AddEventHandler("main", "OnBeforeUserUpdate", "OnBeforeUserUpdateHandler");

AddEventHandler("main", "OnBeforeUserLogin", "DoBeforeUserLoginHandler");

if (file_exists(__DIR__ . '/module_updater.php'))
{
	include(__DIR__ . '/module_updater.php');
}

