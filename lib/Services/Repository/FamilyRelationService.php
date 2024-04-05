<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;


use Exception;
use Bitrix\Main\DB\SqlException;
use Up\Tree\Entity\FamilyRelation;
use Up\Tree\Model\PersonParentTable;

class FamilyRelationService
{
	/**
	 * @throws Exception
	 * @throws SqlException
	 */
	public static function addFamilyRelation(FamilyRelation $relation): int|array
	{
		$relationData = [
			"PARENT_ID" => $relation->getParentId(),
			"CHILD_ID" => $relation->getChildId(),
		];

		$result = PersonParentTable::add($relationData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error adding a relationship");
	}

	public static function getFamilyRelationByPersonsIds(array $ids): array
	{
		$relations = PersonParentTable::query()
								  ->setSelect(['PARENT_ID', 'CHILD_ID'])
								  ->whereIn('PARENT_ID', $ids)
								  ->whereIn('CHILD_ID', $ids)
								  ->exec()
								  ->fetchAll();

		$relationList = [];
		foreach ($relations as $relationData)
		{
			$relation = new FamilyRelation((int)$relationData['PARENT_ID'], (int)$relationData['CHILD_ID']);
			$relationList[] = $relation;
		}

		return $relationList;
	}
}