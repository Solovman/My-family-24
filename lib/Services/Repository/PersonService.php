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
	public static function addPerson(
		Person $person,
		array  $personConnectedIds,
		string $relationType
	): array
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

		$personId = $newPerson->getId();
		$ids[] = $personId;

		if ($relationType === 'partner')
		{
			$relationMarriedData = [
				"PERSON_ID" => $newPerson->getId(),
				"PARTNER_ID" => $personConnectedIds[0],
			];

			$relationMarriedDataReverse = [
				"PERSON_ID" => $personConnectedIds[0],
				"PARTNER_ID" => $newPerson->getId(),
			];

			$relationMarriedId = MarriedTable::add($relationMarriedData)->getId();
			$relationMarriedReverseId = MarriedTable::add($relationMarriedDataReverse)->getId();

			$ids[] = $relationMarriedId;
			$ids[] = $relationMarriedReverseId;
		}
		if ($relationType === 'parent')
		{
			$relationData = [
				"PARENT_ID" => $newPerson->getId(),
				"CHILD_ID" => $personConnectedIds[0],
			];

			$relationId = PersonParentTable::add($relationData)->getId();
			$ids[] = $relationId;
		}
		if ($relationType === 'child')
		{
			$relationData1 = [
				"PARENT_ID" => $personConnectedIds[0],
				"CHILD_ID" => $newPerson->getId(),
			];
			$relationData2 = [
				"PARENT_ID" => $personConnectedIds[1],
				"CHILD_ID" => $newPerson->getId(),
			];


			$relationId1 = PersonParentTable::add($relationData1)->getId();
			$relationId2 = PersonParentTable::add($relationData2)->getId();
			$ids[] = $relationId1;
			$ids[] = $relationId2;
		}
		return $ids;
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