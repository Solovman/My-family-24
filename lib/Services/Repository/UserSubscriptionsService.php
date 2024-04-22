<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\UserSubscription;
use Up\Tree\Model\UserSubscriptionTable;

class UserSubscriptionsService
{
	public static function getCountTreesByUserId(int $userId): int
	{
		$countTrees = UserSubscriptionTable::query()
													->setSelect(['COUNT_TREES'])
													->setFilter(['USER_ID' => $userId])
													->exec()
													->fetchObject();

		if ($countTrees === null)
		{
			return 1;
		}
		return $countTrees->getCountTrees();
	}

	public static function getCountNodesByUserId(int $userId):int
	{
		$countNodes = UserSubscriptionTable::query()
													->setSelect(['COUNT_NODES'])
													->setFilter(['USER_ID' => $userId])
													->exec()
													->fetchObject();

		return $countNodes->getCountNodes();
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getList(): array
	{
		$userSubscriptions = UserSubscriptionTable::query()
			->setSelect(['USER_ID', 'SUBSCRIPTION_ID', 'COUNT_TREES', 'COUNT_NODES', 'SUBSCRIPTION_BUY_TIME', 'IS_ACTIVE'])
			->exec();

		$resultSubscriptions = [];

		while($result = $userSubscriptions->fetchObject())
		{
			$resultSubscriptions[] = new UserSubscription(
				$result->getUserId(),
				$result->getSubscriptionId(),
				$result->getCountTrees(),
				$result->getCountNodes(),
				$result->getSubscriptionBuyTime(),
				$result->getIsActive()
			);
		}

		return $resultSubscriptions;
	}
}
