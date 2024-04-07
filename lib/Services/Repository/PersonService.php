<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Person;
use Up\Tree\Model\MarriedTable;
use Up\Tree\Model\PersonParentTable;
use Up\Tree\Model\PersonTable;

class PersonService
{
	/**
	 * @throws Exception
	 * @throws SqlException
	 */
	public static function addPerson(Person $person, int $personConnectedId, string $relationType): array
	{
		$personData = [
			"IMAGE_ID" => $person->getImageId(),
			"NAME" => $person->getName(),
			"SURNAME" => $person->getSurname(),
			"BIRTH_DATE" => $person->getBirthDate(),
			"DEATH_DATE" => $person->getDeathDate(),
			"GENDER" => $person->getGender(),
			"TREE_ID" => $person->getTreeId(),
		];

		$ids = [];
		$newPerson = PersonTable::add($personData);

		if (!$newPerson->isSuccess())
		{
			throw new SqlException("Error when adding person");
		}

		$ids[] = $newPerson->getId();

		return array_merge($ids, self::addRelation($relationType, $newPerson->getId(), $personConnectedId));
	}

	/**
	 * @throws Exception
	 */
	private static function addRelation(string $relationType, int $personId, int $relatedId): array
	{
		return match ($relationType)
		{
			'partner' => self::addPartnerRelations($personId, $relatedId),
			'parent' => [self::addParentRelation($personId, $relatedId)],
			'child' => [self::addChildRelation($personId, $relatedId)],
			default => [],
		};
	}

	/**
	 * @throws Exception
	 */
	private static function addPartnerRelations(int $personId, int $partnerId): array
	{
		$relationMarriedData = [
			"PERSON_ID" => $personId,
			"PARTNER_ID" => $partnerId,
		];

		$relationMarriedDataReverse = [
			"PERSON_ID" => $partnerId,
			"PARTNER_ID" => $personId,
		];

		$relationMarriedId = MarriedTable::add($relationMarriedData)->getId();
		$relationMarriedReverseId = MarriedTable::add($relationMarriedDataReverse)->getId();

		return [$relationMarriedId, $relationMarriedReverseId];
	}

	/**
	 * @throws Exception
	 */
	private static function addParentRelation(int $parentId, int $childId): array
	{
		$relationData = [
			"PARENT_ID" => $parentId,
			"CHILD_ID" => $childId,
		];

		return [PersonParentTable::add($relationData)->getId()];
	}

	/**
	 * @throws Exception
	 */
	private static function addChildRelation(int $parentId, int $childId): array
	{
		$relationData = [
			"PARENT_ID" => $childId,
			"CHILD_ID" => $parentId,
		];

		return [PersonParentTable::add($relationData)->getId()];
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPersonsByTreeId(int $treeId): array
	{
		$persons = PersonTable::query()->setSelect([
													   'ID',
													   'IMAGE_ID',
													   'NAME',
													   'SURNAME',
													   'BIRTH_DATE',
													   'DEATH_DATE',
													   'GENDER',
													   'TREE_ID',
												   ])->setFilter(['TREE_ID' => $treeId])->exec()->fetchAll();

		$personList = [];

		foreach ($persons as $personData)
		{
			$person = new Person(
				(int)$personData['IMAGE_ID'],
				$personData['NAME'],
				$personData['SURNAME'],
				$personData['BIRTH_DATE'],
				$personData['DEATH_DATE'],
				$personData['GENDER'],
				(int)$personData['TREE_ID']
			);
			$person->setId((int)$personData['ID']);
			$personList[] = $person;
		}

		return $personList;
	}

	/**
	 * @throws Exception
	 */
	public static function removePersonById(int $id): void
	{
		PersonTable::delete($id);
	}
}