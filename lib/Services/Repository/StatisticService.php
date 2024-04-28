<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Entity\ExpressionField;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Model\PersonTable;
use Bitrix\Main\Type\Date;

class StatisticService
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getGenderCountByTreeId(int $treeId): array
	{
		$menCount = PersonTable::query()
							   ->addSelect(new ExpressionField('COUNT_MALE', 'COUNT(*)'))
							   ->setFilter(['LOGIC' => 'AND', 'TREE_ID' => $treeId, 'GENDER' => 'male'])
							   ->exec()
							   ->fetch();

		$womenCount = PersonTable::query()
								 ->addSelect(new ExpressionField('COUNT_FEMALE', 'COUNT(*)'))
								 ->setFilter(['LOGIC' => 'AND', 'TREE_ID' => $treeId, 'GENDER' => 'female'])
								 ->exec()
								 ->fetch();

		return ['male' => $menCount['COUNT_MALE'], 'female' => $womenCount['COUNT_FEMALE']];
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getHeightsByTreeId(int $treeId): array
	{
		$heights = [];
		$persons = PersonTable::getList([
											'select' => ['NAME', 'HEIGHT'],
											'filter' => ['TREE_ID' => $treeId],
										])->fetchAll();

		foreach ($persons as $person)
		{
			$heights[$person['NAME']] = $person['HEIGHT'];
		}

		return $heights;
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getWeightByTreeId(int $treeId): array
	{
		$weights = [];
		$persons = PersonTable::getList([
											'select' => ['NAME', 'WEIGHT'],
											'filter' => ['TREE_ID' => $treeId],
										])->fetchAll();

		foreach ($persons as $person)
		{
			$weights[$person['NAME']] = $person['WEIGHT'];
		}

		return $weights;
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getAgesByTreeId(int $treeId): array
	{
		$ages = [];
		$persons = PersonTable::getList([
											'select' => ['NAME', 'BIRTH_DATE', 'DEATH_DATE'],
											'filter' => ['TREE_ID' => $treeId],
										])->fetchAll();

		foreach ($persons as $person) {
			$age = self::calculateAge($person['BIRTH_DATE'], $person['DEATH_DATE']);
			$ages[$person['NAME']] = $age;
		}

		return $ages;
	}

	private static function calculateAge(?Date $birthDate, ?Date $deathDate): ?int
	{
		if (!$birthDate)
		{
			return null;
		}

		$currentTimestamp = time();

		$birthTimestamp = $birthDate->getTimestamp();

		if ($deathDate)
		{
			$deathTimestamp = $deathDate->getTimestamp();
		}
		else
		{
			$deathTimestamp = $currentTimestamp;
		}

		return (int)floor(($deathTimestamp - $birthTimestamp) / (365.25 * 24 * 60 * 60));
	}
}