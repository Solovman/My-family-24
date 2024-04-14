<?php

declare(strict_types=1);

class AccountComponent extends CBitrixComponent
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
