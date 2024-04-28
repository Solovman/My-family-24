<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\Type\DateTime;
use Exception;
use Up\Tree\Entity\Purchase;
use Up\Tree\Entity\Subscription;
use Up\Tree\Entity\UserSubscription;
use Up\Tree\Model\PurchaseTable;
use Up\Tree\Model\SubscriptionTable;
use Up\Tree\Model\UserSinglePurchaseTable;
use Up\Tree\Model\UserSubscriptionTable;
use Up\Tree\Model\UserTable;

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
	public static function deactivationUser(int $userId, string $active): bool
	{
		$result = UserTable::update($userId, ['ACTIVE' => $active]);

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
	public static function updatePurchase(Purchase $purchase): bool
	{
		$result = PurchaseTable::update(
			$purchase->id, [
			'TITLE' => $purchase->title,
			'PRICE' => $purchase->price,
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
	public static function addPurchase(Purchase $purchase ): bool|int|array
	{
		$result = PurchaseTable::add([
											 'TITLE' => $purchase->title,
											 'PRICE' => $purchase->price,
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
	public static function updateSubscriptionUserRelation(UserSubscription $userSubscription): bool
	{
		$result = UserSubscriptionTable::update($userSubscription->userId, [
			"COUNT_TREES" => $userSubscription->countTrees,
			"COUNT_NODES" => $userSubscription->countNodes,
			"SUBSCRIPTION_BUY_TIME" => $userSubscription->buyTime ? new DateTime($userSubscription->buyTime, 'Y-m-d H:i:s') : null,
			"SUBSCRIPTION_ID" => $userSubscription->subscriptionId,
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
	public static function removePurchase(int $purchaseId): void
	{
		PurchaseTable::delete($purchaseId);
	}

	/**
	 * @throws Exception
	 */
	public static function removePurchaseUser(int $userId, int $purchaseId): void
	{
		UserSinglePurchaseTable::delete(['USER_ID' => $userId, 'SINGLE_PURCHASE_ID' => $purchaseId]);
	}
}