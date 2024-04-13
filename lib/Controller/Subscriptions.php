<?php

namespace Up\Tree\Controller;
use Bitrix\Main\Engine;
use \Up\Tree\Services\Repository\SubscriptionsService;

class Subscriptions extends Engine\Controller
{
	public function getListAction(): array
	{
		$subscriptionsList = SubscriptionsService::getList();

		return [
			'subscriptionsList' => $subscriptionsList
		];

	}
}