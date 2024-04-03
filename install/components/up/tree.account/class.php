<?php

declare(strict_types=1);

use Bitrix\Main\Context;
use Bitrix\Main\DB\SqlException;
use Up\Tree\Services\Repository\UserService;

class FamilyTreeAccountComponent extends CBitrixComponent
{
	/**
	 * @throws SqlException
	 */
	public function executeComponent(): void
	{
		$this->chooseRequest();
		$this->includeComponentTemplate();
	}

	/**
	 * @throws SqlException
	 */
	protected function registerUserAction($request): void
	{
		$email = $request->getPost("email");
		$name = $request->getPost("name");
		$password = $request->getPost("password");

		try {
			UserService::addUser($email, $name, $password);
		}
		catch (SqlException)
		{
			throw new SqlException();
		}
	}

	/**
	 * @throws SqlException
	 */
	protected function chooseRequest(): void
	{
		$request = Context::getCurrent()->getRequest();

		if ($request->isPost())
		{
			$this->registerUserAction($request);
		}
	}
}