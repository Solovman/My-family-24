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
		$this->prepareTreesList();
		$this->includeComponentTemplate();
	}
	public function onPrepareComponentParams($arParams): ?array
	{
		$this->treeRepository = new TreeService();

		$arParams['DATE_FORMAT'] = $arParams['DATE_FORMAT'] ?? 'd.m.Y';

		return $arParams;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	protected function prepareTreesList(): void
	{
		global $USER;

		if ($USER->IsAuthorized())
		{
			$userId = $USER->GetID();
			$this->arResult['TREES'] = $this->treeRepository->getTreesByUserId(((int)$userId));
		}
		$this->prepareTemplateParams();
	}

	protected function prepareTemplateParams(): void
	{
		$this->arResult['DATE_FORMAT'] = $this->arParams['DATE_FORMAT'];
	}
}