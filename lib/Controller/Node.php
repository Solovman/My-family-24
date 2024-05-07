<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use CFile;
use Exception;
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
	 * @throws Exception
	 */
	public function addAction(array $person, array $personConnectedIds, string $relationType): bool
	{
		global $USER;

		$node  = new Person(
			$person['active'],
			(int) $person['imageId'],
			"",
			str_replace(['<', '>', '/'], '', $person['name']),
			str_replace(['<', '>', '/'], '', $person['surname']),
			str_replace(['<', '>', '/'], '', $person['patronymic']),
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

		$numberNodesLimit = SubscriptionsService::getNumberNodesById(1);
		$countNodesByUser = UserSubscriptionsService::getCountNodesByUserId($userId);

		if ($countNodesByUser < $numberNodesLimit)
		{
			try
			{
				PersonService::addPerson($node, $personConnectedIds, $relationType);

				++$countNodesByUser;

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
	 * @throws Exception
	 */
	public function updateAction(int $id, array $updatablePerson): bool
	{
		$treeId = (int) $updatablePerson['treeId'];
		$node  = new Person(
			$updatablePerson['active'],
			(int) $updatablePerson['imageId'],
			'',
			str_replace(['<', '>', '/'], '', $updatablePerson['name']),
			str_replace(['<', '>', '/'], '', $updatablePerson['surname']),
			str_replace(['<', '>', '/'], '', $updatablePerson['patronymic']),
			$updatablePerson['birthDate'],
			$updatablePerson['deathDate'],
			$updatablePerson['gender'],
			$treeId,
			null,
			(float) $updatablePerson['weight'],
			(float) $updatablePerson['height'],
			$updatablePerson['education']
		);

		if (TreeService::checkTreeBelongsToUser($treeId) && PersonService::checkPersonInTree($id, $node->getTreeId()))
		{
			return PersonService::updatePersonById($id, (int)$updatablePerson['lastImageId'], $node);
		}
		return false;
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
	 * @throws Exception
	 */
	public function removeAction(int $id):void
	{
		try {
			global $USER;
			PersonService::removePersonById($id);

			$userId = (int) $USER->GetID();
			$countNodesByUser = (int) UserSubscriptionsService::getCountNodesByUserId($userId);

			--$countNodesByUser;

			UserSubscriptionTable::update($userId, ['COUNT_NODES' => $countNodesByUser]);
		}
		catch (SqlException)
		{
			throw new SqlException("Error when deleting person");
		}
	}
}

