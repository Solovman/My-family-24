<?php

declare(strict_types=1);

class TreeMainComponent extends CBitrixComponent
{
	public function executeComponent(): void
	{
		$this->includeComponentTemplate();
	}

}