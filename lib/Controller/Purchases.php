<?php

declare(strict_types=1);

namespace Up\Tree\Controller;

use Bitrix\Main\Engine;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Services\Repository\PurchaseService;

class Purchases extends Engine\Controller
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getPurchasesAction(): array
	{
		$purchases = PurchaseService::getPurchasesNameForCurrentUser();

		return [
			'purchases' => $purchases
		];

	}
}