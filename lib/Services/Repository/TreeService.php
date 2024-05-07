<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\Application;
use Exception;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\DateTime;
use Up\Tree\Entity\Tree;
use Up\Tree\Model\TreeTable;
use Up\Tree\Model\UserSubscriptionTable;
use Up\Tree\Services\QueryHelperService;

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
			"CREATED_AT" => new DateTime($tree->getCreatedAt(), 'Y-m-d'),
			"COLOR" => $tree->getColor()
		];

		$result = TreeTable::add($treeData);

		$treeId = QueryHelperService::checkQueryResult($result, true);

		if ($treeId === false)
		{
			throw new SqlException("Error creating tree");
		}
		return $treeId;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getTree(int $userId, int $treeId): ?Tree
	{
		$treeData = TreeTable::query()->setSelect([
													  'ID',
													  'TITLE',
													  'USER_ID',
													  'CREATED_AT',
													  'COLOR'
												  ])
									  ->setFilter(['USER_ID' => $userId, 'ID'=> $treeId])
									  ->exec()
									  ->fetch();

		if (!$treeData)
		{
			return null;
		}

		$tree = new Tree(
			$treeData['TITLE'],
			(int)$treeData['USER_ID'],
			$treeData['CREATED_AT']->format('Y-m-d'),
			$treeData['COLOR']
		);

		$tree->setId($treeId);

		$persons = PersonService::getPersonsByTreeId([$tree->getId()]);

		foreach ($persons as $person)
		{
			$tree->addPerson($person);
		}

		$personIds = [];
		foreach ($tree->getPersons() as $person)
		{
			$personIds[] = $person->getId();
		}

		if(empty($personIds))
		{
			$personIds[] = 0;
		}

		$relations = FamilyRelationService::getFamilyRelationByPersonsIds($personIds);

		foreach ($relations as $relation)
		{
			$tree->addFamilyRelation($relation);
		}

		$relationsMarried = FamilyRelationService::getFamilyMarriedRelationById($personIds);

		foreach ($relationsMarried as $relation)
		{
			$tree->addFamilyRelationMarried($relation);
		}

		return $tree;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getTreesByUserId(int $userId): array
	{
		$trees = [];

		$treeData = TreeTable::query()->setSelect(
				[
					'ID',
					'TITLE',
					'USER_ID',
					'CREATED_AT',
					'COLOR',
					'IS_SECURITY'
				]
			)->setFilter(
				[
					'USER_ID' => $userId,
				],
			)
			->exec()->fetchAll();

		foreach ($treeData as $treeItem)
		{
			$tree = new Tree(
				$treeItem['TITLE'],
				(int)$treeItem['USER_ID'],
				$treeItem['CREATED_AT']->format('Y-m-d'),
				$treeItem['COLOR'],
				(int)$treeItem['IS_SECURITY']
			);
			$tree->setId((int)$treeItem['ID']);
			$trees[] = $tree;
		}

		return $trees;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getTreesByUserIdNotSecurity(int $userId): array
	{
		$treeData = TreeTable::query()->setSelect(
			[
				'ID',
				'TITLE',
				'USER_ID',
				'CREATED_AT',
				'COLOR'
			]
		)->setFilter(
			[
				'USER_ID' => $userId,
				'IS_SECURITY' => false
			]
		)->exec();

		$trees = [];

		while ($result = $treeData->fetchObject())
		{
			$tree = new Tree(
				$result->getTitle(),
				(int)$result->getUserId(),
				$result->getCreatedAt()->format('Y-m-d'),
				$result->getColor()
			);

			$tree->setId((int)$result->getId());
			$trees[] = $tree;
		}

		return $trees;
	}

	/**
	 * @throws Exception
	 */
	public static function removeTreeById(int $id): void
	{
		$connection = Application::getConnection();

		TreeTable::delete($id);

		$deletePersonsQuery = "DELETE FROM up_person WHERE TREE_ID = $id";

		global $USER;
		$userId = $USER->GetID();

		UserSubscriptionTable::update($userId, ['COUNT_NODES' => 0]);

		$connection->queryExecute($deletePersonsQuery);

	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function checkTreeBelongsToUser(int $treeIdUpdated): bool
	{
		global $USER;
		$userId = (int)$USER->GetID();


		$treeIdsForCurrent = TreeTable::query()
									  ->setSelect(['ID'])
									  ->setFilter(['USER_ID' => $userId])
									  ->exec();

		$treeIds = [];

		while($result = $treeIdsForCurrent ->fetchObject())
		{
			$treeIds[] = $result->getId();
		}

		return in_array($treeIdUpdated, $treeIds, true);
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getTreesByUserNotSecure(): array
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$trees = TreeTable::query()
			->setSelect(['ID'])
			->setFilter(['USER_ID' => $userId, 'IS_SECURITY' => false])
			->exec();

		$treesIds = [];

		while ($result = $trees->fetchObject())
		{
			$treesIds[] = $result->getId();
		}

		return $treesIds;
	}
}