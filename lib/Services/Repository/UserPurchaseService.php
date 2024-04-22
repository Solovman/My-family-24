<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\UserPurchase;
use \Up\Tree\Model\UserSinglePurchaseTable;

class UserPurchaseService
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getList(): array
	{
		$userPurchase = UserSinglePurchaseTable::query()
			->setSelect(['USER_ID', 'SINGLE_PURCHASE_ID'])
			->exec();

		$resultUserPurchase = [];

		while($result = $userPurchase->fetchObject())
		{
			$resultUserPurchase[] = new UserPurchase(
				$result->getUserId(),
				$result->getSinglePurchaseId(),
			);
		}

		return $resultUserPurchase;
	}
}