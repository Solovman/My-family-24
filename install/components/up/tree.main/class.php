<?php

declare(strict_types=1);

use Bitrix\Main\Context;
use Bitrix\Main\DB\SqlException;
use Up\Tree\Services\Repository\UserService;

class TreeMainComponent extends CBitrixComponent
{
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}

}