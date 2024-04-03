<?php

declare(strict_types=1);

class FamilyTreeMainComponent extends CBitrixComponent
{
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}
}