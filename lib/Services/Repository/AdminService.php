<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Up\Tree\Entity\Admin\AdminSubscription;
use Up\Tree\Entity\Admin\AdminSubscriptionAdding;
use Up\Tree\Entity\Subscription;
use Up\Tree\Model\SubscriptionTable;
use Up\Tree\Model\UserSinglePurchaseTable;
use Up\Tree\Model\UserSubscriptionTable;

class AdminService
{

	/**
	 * @throws Exception
	 */
	public static function deactivationSubscription(int $id, bool $active): bool
	{
		$result = SubscriptionTable::update($id, ['IS_ACTIVE' => $active]);

		if (!$result->isSuccess())
		{
			return false;
		}

		return true;
	}

	/**
	 * @throws Exception
	 */
	public static function updateSubscription(Subscription $subscription): bool
	{
		$result = SubscriptionTable::update($subscription->id, [
			'LEVEL' => $subscription->level,
			'PRICE' => $subscription->price,
			'NUMBER_TREES' => $subscription->numberTrees,
			'NUMBER_NODES' => $subscription->numberNodes,
			'CUSTOMIZATION' => $subscription->customization
		]);

		if (!$result->isSuccess())
		{
			return false;
		}

		return true;
	}

	/**
	 * @throws Exception
	 */
	public static function addSubscription(Subscription $subscription): bool|int
	{
		$result = SubscriptionTable::add([
			'LEVEL' => $subscription->level,
			'PRICE' => $subscription->price,
			'NUMBER_TREES' => $subscription->numberTrees,
			'NUMBER_NODES' => $subscription->numberNodes,
			'CUSTOMIZATION' => $subscription->customization
		]);

		if (!$result->isSuccess())
		{
			return false;

		}

		return $result->getId();
	}


	/**
	 * @throws Exception
	 */
	public static function updateSubscriptionUserRelation(int $userId, int $subscriptionId): void
	{

		UserSubscriptionTable::update($userId, ["SUBSCRIPTION_ID" => $subscriptionId]);
	}

	/**
	 * @throws Exception
	 */
	public static function deactivationSubscriptionByUserId(int $id): void
	{
		UserSubscriptionTable::update($id, ['IS_ACTIVE' => false]);
	}

	/**
	 * @throws Exception
	 */
	public static function addPurchaseUserRelation(int $userId, int $purchaseId): void
	{
		$userPurchaseData = [
			"USER_ID" =>  $userId,
			"SINGLE_PURCHASE_ID" => $purchaseId,
		];

		UserSinglePurchaseTable::add($userPurchaseData);
	}

	/**
	 * @throws Exception
	 */
	public static function removePurchase(int $userId, int $purchaseId): void
	{
		UserSinglePurchaseTable::delete(['USER_ID' => $userId, 'SINGLE_PURCHASE_ID' => $purchaseId]);
	}
}