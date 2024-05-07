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
		$counts = [];

		$result = PersonTable::query()
							 ->addSelect('GENDER')
							 ->addSelect(new ExpressionField('COUNT', 'COUNT(*)'))
							 ->setFilter(['TREE_ID' => $treeId])
							 ->addGroup('GENDER')
							 ->exec();

		while ($row = $result->fetch())
		{
			$counts[$row['GENDER']] = $row['COUNT'];
		}

		return $counts;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getEducationCountByTreeId(int $treeId): array
	{
		$counts = [];

		$result = PersonTable::query()
							 ->addSelect('EDUCATION_LEVEL')
							 ->addSelect(new ExpressionField('COUNT', 'COUNT(*)'))
							 ->setFilter(['TREE_ID' => $treeId])
							 ->addGroup('EDUCATION_LEVEL')
							 ->exec();

		while ($row = $result->fetch())
		{
			$counts[$row['EDUCATION_LEVEL']] = $row['COUNT'];
		}

		return $counts;
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