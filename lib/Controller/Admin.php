<?php

namespace Up\Tree\Controller;

use Exception;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\UI\PageNavigation;
use Up\Tree\Entity\Purchase;
use Up\Tree\Entity\Subscription;
use Up\Tree\Entity\UserSubscription;
use Up\Tree\Services\Repository\AdminService;
use Up\Tree\Services\Repository\PurchaseService;
use Up\Tree\Services\Repository\SubscriptionsService;
use Up\Tree\Services\Repository\UserPurchaseService;
use Up\Tree\Services\Repository\UserSubscriptionsService;

class Admin extends Engine\Controller
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getListSubscriptionAction(): array
	{
		$result = SubscriptionsService::getList();

		return [
			'listSubscription'  => $result
		];
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getListPurchaseAction(): array
	{
		$result = PurchaseService::getPurchases();

		return [
			'listPurchase' => $result
		];
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getListUserSubscriptionAction(): array
	{
		$result = UserSubscriptionsService::getList();

		return [
			'listUserSubscriptions' => $result
		];
	}

	/**
	 * @throws Exception
	 */
	public static function updateUserSubscriptionAction(array $newUserSubscription): bool
	{
		$result = new UserSubscription(
			(int) $newUserSubscription['userId'],
			(int) $newUserSubscription['subscriptionId'],
			(int) $newUserSubscription['countTrees'],
			(int) $newUserSubscription['countNodes'],
			$newUserSubscription['buyTime']
		);

		return AdminService::updateSubscriptionUserRelation($result);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getListUserPurchaseAction(): array
	{
		$result = UserPurchaseService::getList();

		return [
			'listUserPurchase' => $result
		];
	}

	/**
	 * @throws Exception
	 */
	public static function deactivationSubscriptionAction(int $id, bool $active): bool
	{
		return AdminService::deactivationSubscription($id, $active);
	}

	/**
	 * @throws Exception
	 */
	public static function updateSubscriptionAction(array $newSubscription): bool
	{
		$subscription = new Subscription(
			(int) $newSubscription['id'],
			$newSubscription['level'],
			(int) $newSubscription['price'],
			(int) $newSubscription['numberTrees'],
			(int) $newSubscription['numberNodes'],
			(int) $newSubscription['customization'],
			null
		);

		return AdminService::updateSubscription($subscription);
	}

	public static function updatePurchaseAction(array $newPurchase): bool
	{
		$purchase = new Purchase(
			(int) $newPurchase['id'],
			$newPurchase['title'],
			(int) $newPurchase['price']
		);

		return AdminService::updatePurchase($purchase);
	}

	/**
	 * @throws Exception
	 */
	public static function addSubscriptionAction(array $subscription): array
	{
		$addSubscription = new Subscription(
			null,
			$subscription['level'],
			(int) $subscription['price'],
			(int) $subscription['numberTrees'],
			(int) $subscription['numberNodes'],
			(int) $subscription['customization'],
			1
		);

		$result = AdminService::addSubscription($addSubscription);

		return [
			'addId' => $result
		];
	}

	/**
	 * @throws Exception
	 */
	public static function addPurchaseAction(array $purchase): array
	{
		$newPurchase = new Purchase(
			null,
			$purchase['title'],
			(int) $purchase['price'],
		);

		$result = AdminService::addPurchase($newPurchase);

		return [
			'addId' => $result
		];
	}

	/**
	 * @throws Exception
	 */
	public static function addPurchaseUserRelationAction(int $userId, int $purchaseId): void
	{

		AdminService::addPurchaseUserRelation($userId ,$purchaseId);
	}



	/**
	 * @throws Exception
	 */
	public static function removePurchaseAction(int $purchaseId): void
	{
		AdminService::removePurchase($purchaseId);
	}

	/**
	 * @throws Exception
	 */
	public static function removePurchaseUserRelationAction(int $userId, int $purchaseId): void
	{
		AdminService::removePurchaseUser($userId, $purchaseId);
	}

}
