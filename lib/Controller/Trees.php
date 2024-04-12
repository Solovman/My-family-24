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
use Exception;
use Up\Tree\Entity\Image;
use Up\Tree\Entity\Person;
use Up\Tree\Services\Repository\PersonService;
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
			'trees' => $trees,
		];
	}

	/**
	 * @throws SqlException
	 */
	public function addTreeAction(string $treeTitle): void
	{
		global $USER, $DB;

		$userId = $USER->GetID();

		$newTree = new Tree($treeTitle, (int)$userId, new DateTime());
		TreeService::addTree($newTree);
		$newTreeId = $DB->LastID();

		$initialNode = new Person(
			1,
			'/local/modules/up.tree/images/user_default.png',
			'Enter your name',
			'Enter your surname',
			new Date(),
			null,
			'',
			(int)$newTreeId,
		);

		PersonService::addPerson(
			$initialNode,
			new Image('/local/modules/up.tree/images/user_default.png'),
			[0],
			'init'
		);

	}

	/**
	 * @throws Exception
	 * @throws SqlException
	 */
	public function removeTreeAction($id): void
	{
		try
		{
			TreeService::removeTreeById((int)$id);
		}
		catch (SqlException)
		{
			throw new SqlException("Error when deleting tree");
		}
	}
}