<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\DateTime;
use Up\Tree\Entity\Tree;
use Up\Tree\Model\TreeTable;

class TreeService
{
	/**
	 * @throws SqlException
	 * @throws Exception
	 */
	public static function addTree(Tree $tree): int|array
	{
		$treeData = [
			"TITLE" => $tree->getTitle(),
			"USER_ID" => $tree->getUserId(),
			"CREATED_AT" => $tree->getCreatedAt(),
		];

		$result = TreeTable::add($treeData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error creating tree");
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getTreeByUserId(int $userId): ?Tree
	{
		$treeData = TreeTable::query()
							 ->setSelect(['ID', 'TITLE', 'USER_ID', 'CREATED_AT'])
							 ->setFilter(['USER_ID' => $userId])
							 ->exec()
							 ->fetch();

		if (!$treeData)
		{
			return null;
		}

		$tree = new Tree(
			$treeData['TITLE'],
			(int)$treeData['USER_ID'],
			new DateTime($treeData['CREATED_AT'])
		);
		$tree->setId((int)$treeData['ID']);

		// Getting tree personas for tree
		$persons = PersonService::getPersonsByTreeId($tree->getId());

		foreach ($persons as $person)
		{
			$tree->addPerson($person);
		}

		$personIds = [];
		foreach ($tree->getPersons() as $person)
		{
			$personIds[] = $person->getId();
		}

		// Getting relationships between persons for tree
		$relations = FamilyRelationService::getFamilyRelationByPersonsIds($personIds);

		foreach ($relations as $relation)
		{
			$tree->addFamilyRelation($relation);
		}

		return $tree;
	}
}