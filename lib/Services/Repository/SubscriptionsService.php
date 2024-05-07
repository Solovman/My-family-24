<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Subscription;
use Up\Tree\Model\SubscriptionTable;
use Up\Tree\Model\UserSubscriptionTable;

class SubscriptionsService
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getList(): array
	{
		$subscriptions = SubscriptionTable::query()
			->setSelect(['ID', 'LEVEL', 'PRICE', 'NUMBER_TREES', 'NUMBER_NODES', 'CUSTOMIZATION', 'IS_ACTIVE'])
			->exec();

		$resultSubscriptions = [];

		while ($result = $subscriptions->fetchObject()) {
			$resultSubscriptions[] = new Subscription(
				$result->getId(),
				$result->getLevel(),
				$result->getPrice(),
				$result->getNumberTrees(),
				$result->getNumberNodes(),
				$result->getCustomization(),
				$result->getIsActive()
			);
		}

		return $resultSubscriptions;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getSubscriptionActive(): array
	{
		$subscriptions = SubscriptionTable::query()
			->setSelect(['ID', 'LEVEL', 'PRICE', 'NUMBER_TREES', 'NUMBER_NODES', 'CUSTOMIZATION', 'IS_ACTIVE'])
			->setFilter(['IS_ACTIVE' => true])
			->exec();

		$resultSubscriptions = [];

		while ($result = $subscriptions->fetchObject()) {
			$resultSubscriptions[] = new Subscription(
				$result->getId(),
				$result->getLevel(),
				$result->getPrice(),
				$result->getNumberTrees(),
				$result->getNumberNodes(),
				$result->getCustomization(),
				$result->getIsActive()
			);
		}

		return $resultSubscriptions;
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */

	public static function getSubscriptionNameByUser()
	{
		global $USER;

		$userId = (int)$USER->GetID();

		$subscriptions = SubscriptionTable::query()
			->setSelect(['LEVEL'])
			->setFilter(['ID' => self::getSubscriptionIdByUserId($userId)])
			->exec()
			->fetchObject();

		return $subscriptions->getLevel();
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getSubscriptionIdByUserId(int $userId): int
	{
		$subscription = UserSubscriptionTable::query()
			->setSelect(['SUBSCRIPTION_ID'])
			->setFilter(['USER_ID' => $userId])
			->exec()
			->fetchObject();

		if ($subscription === null) {
			return 1;
		}

		return (int) $subscription->getSubscriptionId();
	}

	public static function getNumberTreesById(int $id): int
	{
		$numberTrees = SubscriptionTable::query()
			->setSelect(['NUMBER_TREES'])
			->setFilter(['ID' => $id])
			->exec()
			->fetchObject();

		if ($numberTrees === null)
		{
			return 1;
		}

		return (int) $numberTrees->getNumberTrees();
	}

	public static function getNumberNodesById(int $id): int
	{
		$numberTrees = SubscriptionTable::query()
			->setSelect(['NUMBER_NODES'])
			->setFilter(['ID' => $id])
			->exec()
			->fetchObject();

		return (int) $numberTrees->getNumberNodes();
	}
}

