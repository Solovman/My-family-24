<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
use Up\Tree\Entity\Image;
use Up\Tree\Entity\Person;
use \Up\Tree\Services\Repository\PersonService;
use \Bitrix\Main\DB\SqlException;
use Up\Tree\Services\Repository\TreeService;

class Node extends Engine\Controller
{

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getPersonsAction(int $treeId): array
	{
		global $USER;

		$userId = $USER->GetID();

		$result = TreeService::getTree($userId, $treeId);

		return [
			'tree' => $result
		];
	}

	/**
	 * @throws SqlException
	 * @throws ObjectException
	 * @throws \Exception
	 */
	public function addAction(array $person, string $fileName, array $personConnectedIds, string $relationType): array
	{
		$node  = new Person(
			(int) $person['imageId'],
			$fileName,
			$person['name'],
			$person['surname'],
			new Date($person['birthDate']),
			new Date($person['deathDate']),
			$person['gender'],
			(int) $person['treeId']
		);

		$image = new Image($fileName);

		try {
			return PersonService::addPerson($node, $image, $personConnectedIds, $relationType);
		}
		catch (SqlException)
		{
			throw new SqlException("Error when adding person");
		}
	}

	/**
	 * @throws ObjectException
	 * @throws \Exception
	 */
	public function updateAction(int $id, string $fileName, array $updatablePerson): bool
	{
		$node  = new Person(
			(int) $updatablePerson['imageId'],
			$fileName,
			$updatablePerson['name'],
			$updatablePerson['surname'],
			new Date($updatablePerson['birthDate']),
			new Date($updatablePerson['deathDate']),
			$updatablePerson['gender'],
			(int) $updatablePerson['treeId']
		);

		return PersonService::updatePersonById($id, new Image($fileName), $node);
	}

	/**
	 * @throws \Exception
	 */
	public function removeAction(int $id):void
	{
		try {
			PersonService::removePersonById($id);
		}
		catch (SqlException)
		{
			throw new SqlException("Error when deleting person");
		}

	}
}
