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
use Up\Tree\Services\QueryHelperService;

class AdminService
{

	/**
	 * @throws Exception
	 */
	public static function deactivationSubscription(int $id, bool $active): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			$result = SubscriptionTable::update($id, ['IS_ACTIVE' => $active]);

			return QueryHelperService::checkQueryResult($result);
		}

		return false;
	}

	/**
	 * @throws Exception
	 */
	public static function deactivationUser(int $userId, string $active): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			$result = UserTable::update($userId, ['ACTIVE' => $active]);

			return QueryHelperService::checkQueryResult($result);
		}

		return false;

	}

	/**
	 * @throws Exception
	 */
	public static function updateSubscription(Subscription $subscription): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			$result = SubscriptionTable::update($subscription->id, [
				'LEVEL' => $subscription->level,
				'PRICE' => $subscription->price,
				'NUMBER_TREES' => $subscription->numberTrees,
				'NUMBER_NODES' => $subscription->numberNodes,
				'CUSTOMIZATION' => $subscription->customization
			]);

			return QueryHelperService::checkQueryResult($result);
		}

		return false;

	}

	/**
	 * @throws Exception
	 */
	public static function updatePurchase(Purchase $purchase): bool
	{
		global $USER;

		if($USER->IsAdmin())
		{
			$result = PurchaseTable::update(
				$purchase->id, [
				'TITLE' => $purchase->title,
				'PRICE' => $purchase->price,
			]);

			return QueryHelperService::checkQueryResult($result);
		}

		return false;
	}
	/**
	 * @throws Exception
	 */
	public static function addSubscription(Subscription $subscription): bool|int
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			$result = SubscriptionTable::add([
				'LEVEL' => $subscription->level,
				'PRICE' => $subscription->price,
				'NUMBER_TREES' => $subscription->numberTrees,
				'NUMBER_NODES' => $subscription->numberNodes,
				'CUSTOMIZATION' => $subscription->customization
			]);

			return QueryHelperService::checkQueryResult($result, true);
		}

		return false;

	}

	/**
	 * @throws Exception
	 */
	public static function addPurchase(Purchase $purchase ): bool|int|array
	{
		global $USER;

		if($USER->IsAdmin())
		{
			$result = PurchaseTable::add([
				'TITLE' => $purchase->title,
				'PRICE' => $purchase->price,
			]);

			return QueryHelperService::checkQueryResult($result, true);
		}

		return false;
	}


	/**
	 * @throws Exception
	 */
	public static function updateSubscriptionUserRelation(UserSubscription $userSubscription): bool
	{
		global $USER;

		if($USER->IsAdmin())
		{
			$result = UserSubscriptionTable::update($userSubscription->userId, [
				"COUNT_TREES" => $userSubscription->countTrees,
				"COUNT_NODES" => $userSubscription->countNodes,
				"SUBSCRIPTION_BUY_TIME" => $userSubscription->buyTime ? new DateTime($userSubscription->buyTime, 'Y-m-d H:i:s') : null,
				"SUBSCRIPTION_ID" => $userSubscription->subscriptionId,
			]);

			return QueryHelperService::checkQueryResult($result);
		}

		return false;
	}

	/**
	 * @throws Exception
	 */
	public static function deactivationSubscriptionByUserId(int $id): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			UserSubscriptionTable::update($id, ['IS_ACTIVE' => false]);
		}

		return false;
	}

	/**
	 * @throws Exception
	 */
	public static function addPurchaseUserRelation(int $userId, int $purchaseId): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			$userPurchaseData = [
				"USER_ID" =>  $userId,
				"SINGLE_PURCHASE_ID" => $purchaseId,
			];

			UserSinglePurchaseTable::add($userPurchaseData);
		}

		return false;
	}

	/**
	 * @throws Exception
	 */
	public static function removePurchase(int $purchaseId): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			PurchaseTable::delete($purchaseId);
		}

		return false;
	}

	/**
	 * @throws Exception
	 */
	public static function removePurchaseUser(int $userId, int $purchaseId): bool
	{
		global $USER;

		if ($USER->IsAdmin())
		{
			UserSinglePurchaseTable::delete([
												'USER_ID' => $userId,
												'SINGLE_PURCHASE_ID' => $purchaseId
											]);
		}

		return false;
	}
}