<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Services\Repository\SubscriptionsService;
use Up\Tree\Services\Repository\UserService;
use Bitrix\Main\Engine;

class Account extends Engine\Controller
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getUserInfoAction(): array
	{
		$subscriptionName = SubscriptionsService::getSubscriptionNameByUser();

		$userData = UserService::getUserDataById();

		return [
			'userInfo' => [$subscriptionName, $userData]
		];
	}
}