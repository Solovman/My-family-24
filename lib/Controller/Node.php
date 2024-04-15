<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
use CFile;
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
	public function addAction(array $person, array $personConnectedIds, string $relationType): array
	{
		$node  = new Person(
			(int) $person['imageId'],
			"",
			$person['name'],
			$person['surname'],
			new Date($person['birthDate']),
			new Date($person['deathDate']),
			$person['gender'],
			(int) $person['treeId']
		);

		try {
			return PersonService::addPerson($node, $personConnectedIds, $relationType);
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
	public function updateAction(int $id, array $updatablePerson): bool
	{
		$node  = new Person(
			(int) $updatablePerson['imageId'],
			'',
			$updatablePerson['name'],
			$updatablePerson['surname'],
			new Date($updatablePerson['birthDate']),
			new Date($updatablePerson['deathDate']),
			$updatablePerson['gender'],
			(int) $updatablePerson['treeId']
		);


		return PersonService::updatePersonById($id,  (int) $updatablePerson['lastImageId'], $node);
	}

	public function uploadFileAction(): array
	{
		$file = $_FILES['photo'];

		$maxSize = 2 * 1024 * 1024;
		$error = CFile::CheckImageFile($file, $maxSize);

		if ($error != '')
		{
			die('uploading error: ' . $error);
		}

		$fileId = CFile::SaveFile($file, 'upload_tree');

		if (!$fileId)
		{
			die('Cannot save file');
		}

		return ['fileId' => $fileId];
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

