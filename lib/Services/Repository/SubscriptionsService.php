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
			->setSelect(['ID', 'LEVEL', 'PRICE', 'NUMBER_TREES', 'NUMBER_NODES', 'CUSTOMIZATION', 'SUBSCRIPTION_TYPE', 'START_DATE', 'END_DATE'])
			->exec();

		$resultSubscriptions = [];

		while($result = $subscriptions->fetchObject())
		{
			$resultSubscriptions[] = new Subscription(
				$result->getId(),
				$result->getLevel(),
				$result->getPrice(),
				$result->getNumberTrees(),
				$result->getNumberNodes(),
				$result->getCustomization(),
				$result->getSubscriptionType(),
				$result->getStartDate(),
				$result->getEndDate(),
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
		$subscriptions = SubscriptionTable::query()
			->setSelect(['LEVEL'])
			->setFilter(['ID' => self::getSubscriptionByUser()])
			->exec()
			->fetchObject();

		return $subscriptions->getLevel();
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getSubscriptionByUser()
	{
		global $USER;

		$userId = $USER->GetID();

		$subscription = UserSubscriptionTable::query()
			->setSelect(['SUBSCRIPTION_ID'])
			->setFilter(['USER_ID', $userId])
			->exec()
			->fetchObject();

		if ($subscription === null) {
			return 1;
		}

		return $subscription->getSubscriptionId();
	}
}

