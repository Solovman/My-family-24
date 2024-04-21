<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Up\Tree\Model\UserSinglePurchaseTable;
use Up\Tree\Model\UserSubscriptionTable;

class AdminService
{
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
		UserSubscriptionTable::update($id, ['IS_ACTIVE' => False]);
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