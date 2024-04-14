<?php

declare(strict_types=1);

use Bitrix\Main\Context;

Bitrix\Main\Loader::includeModule('up.tree');

class TreeMainComponent extends CBitrixComponent
{
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}
}