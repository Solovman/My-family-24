<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Up\Tree\Model\UserSubscriptionTable;

class UserSubscriptionsService
{
	public static function getCountTreesByUserId(int $userId): int
	{
		$countTrees = UserSubscriptionTable::query()
													->setSelect(['COUNT_TREES'])
													->setFilter(['USER_ID' => $userId])
													->exec()
													->fetchObject();

		if ($countTrees === null)
		{
			return 1;
		}
		return $countTrees->getCountTrees();

	}
}
