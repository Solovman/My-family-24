<?php

namespace Up\Tree\Controller;

use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\Type\Date;
use Up\Tree\Entity\Person;
use \Up\Tree\Services\Repository\PersonService;
use \Bitrix\Main\DB\SqlException;

class Node extends Engine\Controller
{
	/**
	 * @throws SqlException
	 * @throws ObjectException
	 */
	public function addAction(array $person): bool
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

		if (!is_numeric($result))
		{
			return false;
		}

		return true;
	}
}
