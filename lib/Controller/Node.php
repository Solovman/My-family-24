<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
use Up\Tree\Entity\FamilyRelation;
use Up\Tree\Entity\FamilyRelationMarried;
use Up\Tree\Entity\Person;
use Up\Tree\Services\Repository\FamilyRelationService;
use \Up\Tree\Services\Repository\PersonService;
use \Bitrix\Main\DB\SqlException;
use Up\Tree\Services\Repository\TreeService;

class Node extends Engine\Controller
{

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 * @throws \JsonException
	 */
	public function getPersonsAction(): array
	{
		global $USER;

		$userID = $USER->GetID();

		$result = TreeService::getTreeByUserId($userID);

		return [
			'tree' => $result
		];
	}

	/**
	 * @throws SqlException
	 * @throws ObjectException
	 * @throws \Exception
	 */
	public function addAction(array $person, array $relation): bool
	{
		$node  = new Person(
			(int) $person['imageId'],
			$person['name'],
			$person['surname'],
			new Date($person['birthDate']),
			new Date($person['deathDate']),
			$person['gender'],
			(int) $person['treeId']
		);

		$result = PersonService::addPerson($node);

		$relationNode = new FamilyRelation(
			(int)$relation['parentID'],
			(int)$relation['childID'],
		);

		$relationMarriedNode = new FamilyRelationMarried(
			(int)$relation['personID'],
			(int)$relation['partnerID']
		);

		$relationParent = FamilyRelationService::addFamilyRelation($relationNode);
		$relationMarried = FamilyRelationService::addFamilyMarriedRelation($relationMarriedNode);


		if (!is_numeric($result) || !is_numeric($relationParent) || !is_numeric($relationMarried))
		{
			return false;
		}

		return true;
	}
}
