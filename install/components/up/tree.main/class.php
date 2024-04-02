<?php

declare(strict_types=1);

Bitrix\Main\Loader::includeModule('up.tree');

class FamilyTreeMainComponent extends CBitrixComponent
{
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}
}