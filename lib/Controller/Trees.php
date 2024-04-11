<?php

declare(strict_types=1);

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
use Bitrix\Main\Type\DateTime;
use Up\Tree\Entity\Tree;
use Up\Tree\Services\Repository\TreeService;

class Trees extends Engine\Controller
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getTreesAction(): array
	{
		global $USER;

		$userId = $USER->GetID();

		$trees = TreeService::getTreesByUserId((int)$userId);

		return [
			'trees' => $trees
		];
	}

	/**
	 * @throws SqlException
	 */
	public function addTreeAction(string $treeTitle): void
	{
		global $USER;

		$userId = $USER->GetID();

		$newTree = new Tree($treeTitle, (int)$userId, new DateTime(),);
		TreeService::addTree($newTree);
	}
}