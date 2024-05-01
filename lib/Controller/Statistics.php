<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Services\Repository\StatisticService;
use Up\Tree\Services\Repository\TreeService;


class Statistics extends Engine\Controller
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */

	private static function checkIsValidTreeId(int $treeId): bool
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$treesUser = TreeService::getTreesByUserId($userId);

		$treesUserIds = [];

		foreach ($treesUser as $tree)
		{
			$treesUserIds[] = $tree->getId();
		}

		if (!in_array($treeId, $treesUserIds, true))
		{
			return false;
		}

		return true;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getGenderCountByTreeIdAction(int $treeId): bool|array
	{
		if (!self::checkIsValidTreeId($treeId))
		{
			return false;
		}

		return StatisticService::getGenderCountByTreeId($treeId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getHeightsByTreeIdAction(int $treeId): bool|array
	{
		if (!self::checkIsValidTreeId($treeId))
		{
			return false;
		}

		return StatisticService::getHeightsByTreeId($treeId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getWeightByTreeIdAction(int $treeId): bool|array
	{
		if (!self::checkIsValidTreeId($treeId))
		{
			return false;
		}

		return StatisticService::getWeightByTreeId($treeId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getAgesByTreeIdAction(int $treeId): bool|array
	{
		if (!self::checkIsValidTreeId($treeId))
		{
			return false;
		}
		return StatisticService::getAgesByTreeId($treeId);
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getTreesByUserIdAction(): array
	{
		global $USER;

		$userId = (int) $USER->GetID();

		return TreeService::getTreesByUserId($userId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getEducationCountByTreeIdAction($treeId): bool|array
	{
		if (!self::checkIsValidTreeId($treeId))
		{
			return false;
		}

		return StatisticService::getEducationCountByTreeId($treeId);
	}

}