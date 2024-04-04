<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\DB\SqlException;
use Exception;
use Up\Tree\Entity\Tree;
use Up\Tree\Model\TreeTable;

class TreeService
{
	/**
	 * @throws SqlException
	 * @throws Exception
	 */
	public static function addTree(Tree $tree): int|array
	{
		$treeData = [
			"TITLE" => $tree->getTitle(),
			"USER_ID" => $tree->getUserId(),
			"CREATED_AT" => $tree->getCreatedAt(),
		];

		$result = TreeTable::add($treeData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error creating tree");
	}
}