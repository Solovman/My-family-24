<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\Application;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
use Bitrix\Main\Type\DateTime;
use CFile;
use Exception;
use Up\Tree\Entity\Image;
use Up\Tree\Entity\Person;
use Up\Tree\Model\FileTable;
use Up\Tree\Model\MarriedTable;
use Up\Tree\Model\PersonParentTable;
use Up\Tree\Model\PersonTable;
use Up\Tree\Model\TreeTable;

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
			"ACTIVE" => $person->getActive(),
			"IMAGE_ID" => $person->getImageId(),
			"NAME" => $person->getName(),
			"SURNAME" => $person->getSurname(),
			'BIRTH_DATE' => $person->getBirthDate() ? new Date($person->getBirthDate(), 'Y-m-d') : null,
			'DEATH_DATE' => $person->getDeathDate() ? new Date($person->getDeathDate(), 'Y-m-d') : null,
			"GENDER" => $person->getGender(),
			"TREE_ID" => $person->getTreeId(),
			'WEIGHT' => $person->getWeight(),
			'HEIGHT' => $person->getHeight(),
			'EDUCATION_LEVEL' => $person->getEducationLevel(),
			'HASH' => hash('sha256',$person->getGender() . '_' . $person->getName() . '_' . $person->getSurname())
		];

		$ids = [];

		$newPerson = PersonTable::add($personData);

		if (!$newPerson->isSuccess())
		{
			throw new SqlException("Error when adding person");
		}

		$personId = $newPerson->getId();
		$ids[] = $personId;

		if ($relationType === 'init')
		{
			return $ids;
		}

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

			if ($personConnectedIds[1])
			{
				$relationData2 = [
					"PARENT_ID" => $personConnectedIds[1],
					"CHILD_ID" => $newPerson->getId(),
				];

				$relationId2 = PersonParentTable::add($relationData2)->getId();
				$ids[] = $relationId2;
			}

			$relationId1 = PersonParentTable::add($relationData1)->getId();
			$ids[] = $relationId1;
		}

		if ($relationType === 'partnerParent')
		{
			$relationData = [
				"PARENT_ID" => $newPerson->getId(),
				"CHILD_ID" => $personConnectedIds[1],
			];

			$relationMarriedData = [
				"PERSON_ID" => $newPerson->getId(),
				"PARTNER_ID" => $personConnectedIds[0],
			];

			$relationMarriedDataReverse = [
				"PERSON_ID" => $personConnectedIds[0],
				"PARTNER_ID" => $newPerson->getId(),
			];

			MarriedTable::add($relationMarriedData)->getId();
			MarriedTable::add($relationMarriedDataReverse)->getId();
			PersonParentTable::add($relationData)->getId();
		}

		return $ids;
	}


	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getPersonsByTreeId(array $treeIds): array
	{
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
											  'WEIGHT',
											  'HEIGHT',
											  'EDUCATION_LEVEL',
											  'TREE_DATA_' => 'TREE_DATA',
											  'HASH'
										  ])->whereIn('TREE_ID', $treeIds)->exec()->fetchAll();


		$personList = [];

		foreach ($persons as $personData)
		{
			$person = new Person(
				$personData['ACTIVE'],
				(int)$personData['IMAGE_ID'],
				self::getImageName((int)$personData['ID']),
				str_replace(['<', '>', '/'], '', $personData['NAME']),
				str_replace(['<', '>', '/'], '', $personData['SURNAME']),
				$personData['BIRTH_DATE'] ? $personData['BIRTH_DATE']->format('Y-m-d') : null,
				$personData['DEATH_DATE'] ? $personData['DEATH_DATE']->format('Y-m-d') : null,
				$personData['GENDER'],
				(int)$personData['TREE_ID'],
				(int)$personData['TREE_DATA_USER_ID'],
				(float)$personData['WEIGHT'],
				(float)$personData['HEIGHT'],
				$personData['EDUCATION_LEVEL'],
				$personData['HASH']
			);
			$person->setId((int)$personData['ID']);

			$personList[] = $person;
		}

		return $personList;
	}

	/**
	 * @throws Exception
	 */
	public static function updatePersonById(int $id, $lastImageId, Person $updatablePerson): bool
	{
		$personData = [
			'ACTIVE' => $updatablePerson->getActive(),
			'IMAGE_ID' => $updatablePerson->getImageId(),
			'NAME' => $updatablePerson->getName(),
			'SURNAME' => $updatablePerson->getSurname(),
			'BIRTH_DATE' => $updatablePerson->getBirthDate() ? new Date($updatablePerson->getBirthDate(), 'Y-m-d') : null,
			'DEATH_DATE' => $updatablePerson->getDeathDate() ? new Date($updatablePerson->getDeathDate(), 'Y-m-d') : null,
			'GENDER' => $updatablePerson->getGender(),
			'WEIGHT' => $updatablePerson->getWeight(),
			'HEIGHT' => $updatablePerson->getHeight(),
			'EDUCATION_LEVEL' => $updatablePerson->getEducationLevel(),
			'TREE_ID' => $updatablePerson->getTreeId()
		];

		$result = PersonTable::update($id , $personData);

		if ($lastImageId !== 1)
		{
			FileTable::delete($lastImageId);
		}

		if (!$result->isSuccess())
		{
			return false;
		}
		return true;
	}

	/**
	 * @throws Exception
	 */
	public static function removePersonById(int $id): void
	{
		$connection = Application::getConnection();

		$deletePersonParentRelationQuery = "DELETE FROM up_relation_person_parent WHERE PARENT_ID = $id OR CHILD_ID = $id";
		$connection->queryExecute($deletePersonParentRelationQuery);

		$deleteMarriedRelationQuery = "DELETE FROM up_relation_married WHERE PERSON_ID = $id OR PARTNER_ID = $id";
		$connection->queryExecute($deleteMarriedRelationQuery);
		$connection->queryExecute($deleteMarriedRelationQuery);


		PersonTable::delete($id);
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getImageName(int $personID): string
	{
		$imageID = PersonTable::query()->setSelect(['IMAGE_ID'])
			->setFilter(['ID' => $personID])
			->exec()
			->fetchObject();

		return ImageService::getImageNameByPerson($imageID->getImageID());
	}

	public static function getImageId(int $personId): int
	{
		$imageId = PersonTable::query()->setSelect(['IMAGE_ID'])
			->setFilter(['ID' => $personId])
			->exec()
			->fetchObject();

		return $imageId->getImageID();
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function checkPersonInTree(int $personId, int $treeIdUpdated): bool
	{
		$treeId = PersonTable::query()->setSelect(['TREE_ID'])
							  ->setFilter(['ID' => $personId])
							  ->exec()
							  ->fetchAll();

		$treeId = (int)$treeId[0]['TREE_ID'];

		return $treeId === $treeIdUpdated;
	}
}