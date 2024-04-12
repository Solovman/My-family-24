<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
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
			->setSelect(['ID', 'LEVEL', 'PRICE', 'NUMBER_TREES'])
			->exec();

		$resultSubscriptions = [];

		while($result = $subscriptions->fetchObject())
		{
			$resultSubscriptions[] = new Subscription(
				$result->getId(),
				$result->getLevel(),
				$result->getPrice(),
				 $result->getNumberTrees(),
			);
		}

		return $resultSubscriptions;
	}

	/**
	 * @throws \Exception
	 */
	public static function buySubscriptions(int $idSubscriptions): bool
	{
		global $USER;

		$result = UserSubscriptionTable::add([
			'USER_ID' => $USER->GetID(),
			'SUBSCRIPTION_ID' => $idSubscriptions,
			'SUBSCRIPTION_BUY_TIME' => new Date(),
		]);

		if (!$result->isSuccess())
		{
			return false;
		}

		return true;
	}
}