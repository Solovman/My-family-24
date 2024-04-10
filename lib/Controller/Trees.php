<?php

declare(strict_types=1);

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Services\Repository\TreeService;

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
			'trees' => $trees
		];
	}
}