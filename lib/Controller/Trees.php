<?php

declare(strict_types=1);

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\Date;
use Exception;
use Up\Tree\Entity\Image;
use Up\Tree\Entity\Person;
use Up\Tree\Model\UserSubscriptionTable;
use Up\Tree\Services\Repository\PersonService;
use Bitrix\Main\Type\DateTime;
use Up\Tree\Entity\Tree;
use Up\Tree\Services\Repository\SubscriptionsService;
use Up\Tree\Services\Repository\TreeService;
use Up\Tree\Services\Repository\UserSubscriptionsService;
use Up\Tree\Services\RandomService;

class Trees extends Engine\Controller
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getTreesAction(): array
	{
		global $USER;

		$userId = $USER->GetID();

		$trees = TreeService::getTreesByUserId((int)$userId);

		return [
			'trees' => $trees,
		];
	}

	/**
	 * @throws SqlException
	 * @throws Exception
	 */
	public function addTreeAction(string $treeTitle): bool
	{
		global $USER, $DB;

		$userId = (int)$USER->GetID();

		$subscriptionId = (int)SubscriptionsService::getSubscriptionIdByUserId($userId);

		$countTrees = (int)UserSubscriptionsService::getCountTreesByUserId($userId);
		$numberTreesOnSubscription = (int)SubscriptionsService::getNumberTreesById($subscriptionId);

		if ($numberTreesOnSubscription > $countTrees || $numberTreesOnSubscription === 0)
		{
			$randomColor = RandomService::getRandomGradientColorString();
			$newTree = new Tree($treeTitle, $userId, new DateTime(), $randomColor);
			TreeService::addTree($newTree);
			$newTreeId = $DB->LastID();

			$initialNode = new Person(
				"0",
				1,
				'/local/modules/up.tree/images/user_default.png',
				'Enter your name',
				'Enter your surname',
				new Date(),
				null,
				'',
				(int)$newTreeId,
			);

			PersonService::addPerson(
				$initialNode,
				[0],
				'init'
			);

			$countTrees += 1;

			UserSubscriptionTable::update($userId, ['COUNT_TREES' => $countTrees]);

			return true;
		}

		return false;
	}

	/**
	 * @throws Exception
	 * @throws SqlException
	 */
	public function removeTreeAction($id): void
	{
		try
		{
			global $USER;

			$userId = (int)$USER->GetID();

			$countTrees = (int)UserSubscriptionsService::getCountTreesByUserId($userId);

			TreeService::removeTreeById((int)$id);
			$countTrees -= 1;

			UserSubscriptionTable::update($userId, ['COUNT_TREES' => $countTrees]);
		}
		catch (SqlException)
		{
			throw new SqlException("Error when deleting tree");
		}
	}
}