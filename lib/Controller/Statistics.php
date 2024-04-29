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
	public function getGenderCountByTreeIdAction(int $treeId): array
	{
		return StatisticService::getGenderCountByTreeId($treeId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getHeightsByTreeIdAction(int $treeId): array
	{
		return StatisticService::getHeightsByTreeId($treeId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getWeightByTreeIdAction(int $treeId): array
	{
		return StatisticService::getWeightByTreeId($treeId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getAgesByTreeIdAction(int $treeId): array
	{
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
}