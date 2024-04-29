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
use Up\Tree\Model\UserSubscriptionTable;
use \Up\Tree\Services\Repository\PersonService;
use \Bitrix\Main\DB\SqlException;
use Up\Tree\Services\Repository\SubscriptionsService;
use Up\Tree\Services\Repository\TreeService;
use Up\Tree\Services\Repository\UserSubscriptionsService;

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
	public function addAction(array $person, array $personConnectedIds, string $relationType): bool
	{
		global $USER;

		$node  = new Person(
			$person['active'],
			(int) $person['imageId'],
			"",
			$person['name'],
			$person['surname'],
			$person['birthDate'],
			$person['deathDate'],
			$person['gender'],
			(int) $person['treeId'],
			null,
			(float) $person['weight'],
			(float) $person['height'],
			$person['education']
		);

		$userId = (int) $USER->GetID();

		$numberNodesLimit = (int) SubscriptionsService::getNumberNodesById(1);
		$countNodesByUser = (int) UserSubscriptionsService::getCountNodesByUserId($userId);

		if ($countNodesByUser < $numberNodesLimit)
		{
			try {
				PersonService::addPerson($node, $personConnectedIds, $relationType);

				$countNodesByUser += 1;

				UserSubscriptionTable::update($userId, ['COUNT_NODES' => $countNodesByUser]);
			}
			catch (SqlException)
			{
				throw new SqlException("Error when adding person");
			}

			return true;
		}

		return false;
	}

	/**
	 * @throws ObjectException
	 * @throws \Exception
	 */
	public function updateAction(int $id, array $updatablePerson): bool
	{
		$node  = new Person(
			$updatablePerson['active'],
			(int) $updatablePerson['imageId'],
			'',
			$updatablePerson['name'],
			$updatablePerson['surname'],
			$updatablePerson['birthDate'],
			$updatablePerson['deathDate'],
			$updatablePerson['gender'],
			(int) $updatablePerson['treeId'],
			null,
			(float) $updatablePerson['weight'],
			(float) $updatablePerson['height'],
			$updatablePerson['education']

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
			global $USER;
			PersonService::removePersonById($id);

			$userId = (int) $USER->GetID();
			$countNodesByUser = (int) UserSubscriptionsService::getCountNodesByUserId($userId);

			$countNodesByUser -= 1;

			UserSubscriptionTable::update($userId, ['COUNT_NODES' => $countNodesByUser]);
		}
		catch (SqlException)
		{
			throw new SqlException("Error when deleting person");
		}
	}
}

