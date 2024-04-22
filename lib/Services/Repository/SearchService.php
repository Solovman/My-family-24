<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\Rest\User;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Person;
use Up\Tree\Model\PersonTable;
use Up\Tree\Model\TreeTable;
use Up\Tree\Model\UserTable;
use Up\Tree\Services\Repository\PersonService;
use Up\Tree\Services\Repository\TreeService;

class SearchService
{
	public static function getAllPersonsForSearching()
	{
		# Получение всех ids деревьев текущего юзера
		global $USER;

		$userId = (int)$USER->GetID();

		$tresForCurrentUser = TreeService::getTreesByUserId($userId);

		$treesIdsForCurrentUser = [];

		foreach ($tresForCurrentUser as $tree)
		{
			$treId = $tree->id;
			$treesIdsForCurrentUser[] = $treId;
		}

		$treIds = SearchService::getNotSecureTreeIds();


		/* Получаем всех персон, кроме тех, что находятся в деревьях текущего пользователя
		 и кроме персон из деревьев с флагом IS_SECURE = True */
		$persons = PersonTable::query()
								->registerRuntimeField('TREE_DATA', [
									'data_type' => TreeTable::class,
									'reference' => [
										'=this.TREE_ID' => 'ref.ID',
									],
								])
							  ->setSelect([
													   'ID',
													   'IMAGE_ID',
													   'NAME',
													   'SURNAME',
													   'BIRTH_DATE',
													   'DEATH_DATE',
													   'GENDER',
													   'TREE_ID',
													   'ACTIVE',
													   'TREE_DATA_' => 'TREE_DATA'
												   ])->whereNotIn('TREE_ID', $treesIdsForCurrentUser)
													 ->whereIn('TREE_ID', $treIds)
													 ->exec()
													 ->fetchAll();

		$personList = [];

		foreach ($persons as $personData)
		{
			$person = new Person(
				$personData['ACTIVE'],
				(int)$personData['IMAGE_ID'],
				PersonService::getImageName((int)$personData['ID']),
				$personData['NAME'],
				$personData['SURNAME'],
				$personData['BIRTH_DATE'],
				$personData['DEATH_DATE'],
				$personData['GENDER'],
				(int)$personData['TREE_ID'],
				(int)$personData['TREE_DATA_USER_ID']
			);
			$person->setId((int)$personData['ID']);

			$personList[] = $person;
		}

		return $personList;

	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function searchPersonByTreeId($id): array
	{
		# Персоны дерева текущего пользователя
		$personList = PersonService::getPersonsByTreeId($id);

		# Все персоны из всех деревев
		$allPersonList = self::getAllPersonsForSearching();

		$matchPersonList = [];

		foreach ($personList as $person)
		{
			foreach ($allPersonList as $allPerson)
			{
				if (
					$person->getGender() === $allPerson->getGender() &&
					$person->getName() === $allPerson->getName() &&
					$person->getSurname() === $allPerson->getSurname() //&&
					//$person->getBirthDate()->getTimestamp() === $allPerson->getBirthDate()->getTimestamp() //&&
					//$person->getDeathDate()->getTimestamp() === $allPerson->getDeathDate()->getTimestamp()
				)
				{
					$matchPersonList[] =  $allPerson;
				}
			}
		}
		return $matchPersonList;
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getNotSecureTreeIds(): ?array
	{
		$treeData = TreeTable::query()->setSelect(['ID'])
									  ->setFilter(
			['IS_SECURITY' => False])->exec()->fetchAll();

		if (!$treeData)
		{
			return null;
		}

		$treeIds = [];

		foreach ($treeData as $treeId)
		{
			$treeIds[]  = (int)$treeId['ID'];
		}

		return $treeIds;
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getFoundUserInfo(int $treeId): array
	{
		$matchPersonList = self::searchPersonByTreeId($treeId);

		$treeIds = [];

		foreach ($matchPersonList as $person)
		{
			$treeIds[] = $person->getTreeId();
		}
		$userIdsObject = TreeTable::query()->setSelect([
										  'USER_ID',
									  ])->whereIn('ID', $treeIds)
										->exec();

		$userIds = [];
		while ($result = $userIdsObject->fetchObject())
		{
			$userIds[]  = $result->getUserId();
		}

		$foundUsers =  UserTable::query()->setSelect([
										  'ID',
										  'NAME',
										  'LAST_NAME',
										  'EMAIL'
									  ])->whereIn('ID', $userIds)
										->exec()
										->fetchAll();

		$foundPersons = $matchPersonList;

		return [
			'foundUsers' => $foundUsers,
			'foundPersons' => $foundPersons,
		];
	}
}