<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Bitrix\Main\DB\SqlException;
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
	 * @throws Exception
	 */
	public static function removePersonById(int $id): void
	{
		PersonTable::delete($id);
	}

}
