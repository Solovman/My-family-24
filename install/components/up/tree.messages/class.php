<?php

declare(strict_types=1);

class TreeMessageComponent extends CBitrixComponent
{
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}
}