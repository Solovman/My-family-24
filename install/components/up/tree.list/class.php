<?php

declare(strict_types=1);

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Services\Repository\TreeService;

class TreeListComponent extends CBitrixComponent
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}
}