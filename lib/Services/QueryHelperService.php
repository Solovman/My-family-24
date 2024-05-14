<?php

declare(strict_types=1);

namespace Up\Tree\Services;

class QueryHelperService
{
	public static function checkQueryResult($result, $returnId = false): bool|int
	{
		if (!$result->isSuccess())
		{
			return false;
		}

		if ($returnId)
		{
			return $result->getId();
		}

		return true;
	}
}