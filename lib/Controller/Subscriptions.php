<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use \Up\Tree\Services\Repository\SubscriptionsService;

class Subscriptions extends Engine\Controller
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getListAction(): array
	{
		$subscriptionsList = SubscriptionsService::getSubscriptionActive();

		return [
			'subscriptionsList' => $subscriptionsList
		];

	}
}