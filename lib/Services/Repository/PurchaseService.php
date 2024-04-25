<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;


use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Model\PurchaseTable;
use Up\Tree\Model\UserTable;

class PurchaseService
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPurchaseIdsByUserId(int $id): array
	{
		$purchases = UserTable::query()
							  ->setSelect(['PURCHASE_' => 'USER_PURCHASE'])
							  ->setFilter(['ID' => $id])
							  ->exec()
							  ->fetchAll();

		return array_column($purchases, 'PURCHASE_SINGLE_PURCHASE_ID');
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPurchasesNameForCurrentUser(): array
	{
		global $USER;

		$userId = $USER->GetID();

		$purchasesIds = self::getPurchaseIdsByUserId((int)$userId);

		return PurchaseTable::query()
							->setSelect(['ID', 'TITLE'])
							->setFilter(['ID' => $purchasesIds])
							->exec()
							->fetchAll();
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPurchases(): array
	{
		return PurchaseTable::query()
							->setSelect(['ID', 'TITLE', 'PRICE'])
							->exec()
							->fetchAll();
	}
}