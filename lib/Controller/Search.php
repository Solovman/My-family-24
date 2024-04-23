<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Services\Repository\SearchService;
use Up\Tree\Services\Repository\TreeService;

class Search extends Engine\Controller
{

	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getUserTreesAction(): array
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$result = TreeService::getTreesByUserId($userId);

		return [
			'trees' => $result
		];
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getPersonsUsersAction(int $treeId): array
	{
		$result = SearchService::getFoundUserInfo($treeId);

		return [
			'infoUsersPersons' => $result
		];
	}
}