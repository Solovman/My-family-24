<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Person;
use Up\Tree\Model\PersonTable;

class PersonService
{
	/**
	 * @throws SqlException
	 */
	public static function addPerson(Person $person): int|array
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

		$result = PersonTable::add($personData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error when adding person");
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPersonsByTreeId(int $treeId): array
	{
		$persons = PersonTable::query()
							 ->setSelect(['ID',
										  'IMAGE_ID',
										  'NAME',
										  'SURNAME',
										  'BIRTH_DATE',
										  'DEATH_DATE',
										  'GENDER',
										  'TREE_ID'])
							 ->setFilter(['TREE_ID' => $treeId])
							 ->exec()
							 ->fetchAll();

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
}
