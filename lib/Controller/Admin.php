<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\Admin\AdminSubscription;
use Up\Tree\Entity\Admin\AdminSubscriptionAdding;
use Up\Tree\Entity\Subscription;
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
	public static function removePurchaseAction(int $purchaseId): void
	{
		AdminService::removePurchase($purchaseId);
	}

}
