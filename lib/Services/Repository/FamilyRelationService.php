<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;


use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Bitrix\Main\DB\SqlException;
use Up\Tree\Entity\FamilyRelation;
use Up\Tree\Entity\FamilyRelationMarried;
use Up\Tree\Model\MarriedTable;
use Up\Tree\Model\PersonParentTable;
use Up\Tree\Services\QueryHelperService;

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

		$relationId = QueryHelperService::checkQueryResult($result, true);

		if ($relationId === false)
		{
			throw new SqlException("Error adding a relationship");
		}
		return $relationId;
	}

	/**
	 * @throws Exception
	 */
	public static function addFamilyMarriedRelation(FamilyRelationMarried $relation): int|array
	{
		$relationData = [
			"PERSON_ID" => $relation->getPersonId(),
			"PARTNER_ID" => $relation->getPartnerId(),
		];

		$result = MarriedTable::add($relationData);

		$relationId = QueryHelperService::checkQueryResult($result, true);

		if ($relationId === false)
		{
			throw new SqlException("Error adding a relationship");
		}
		return $relationId;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getFamilyRelationByPersonsIds(array $ids): array
	{
		$relations = PersonParentTable::query()
								  ->setSelect(['PARENT_ID', 'CHILD_ID'])
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

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getFamilyMarriedRelationById(array $ids): array
	{
		$relations = MarriedTable::query()
			->setSelect(['PERSON_ID', 'PARTNER_ID'])
			->whereIn('PERSON_ID', $ids)
			->exec()
			->fetchAll();

		$relationList = [];

		foreach ($relations as $relationData)
		{

			$relation = new FamilyRelationMarried(
				(int)$relationData['PERSON_ID'],
				(int)$relationData['PARTNER_ID']
			);

			$relationList[] = $relation;
		}

		return $relationList;
	}
}