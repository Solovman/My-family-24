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
use Up\Tree\Entity\Person;
use Up\Tree\Services\Repository\PersonService;
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
	public function initAction(array $tree): void
	{
		$node  = new Person(
			0,
			'Your name',
			'Your surname',
			new Date(),
			null,
			null,
			(int) $tree['treeId']
		);

		PersonService::addPerson($node, [0], 'init');
	}
}