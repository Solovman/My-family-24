<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Security\Password;
use Bitrix\Main\Type\DateTime;
use Exception;
use Up\Tree\Model\UserTable;

class UserService
{
	/**
	 * @throws Exception
	 */
	public function addUser($email, $username, $password): int|array
	{
		$passwordHash = Password::hash($password);

		$userData = [
			"NAME" => $username,
			"EMAIL" => $email,
			"LOGIN" => $email,
			"PASSWORD" => $passwordHash,
			"DATE_REGISTER" => new DateTime(),
		];

		$result = UserTable::add($userData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error when creating user");
	}
}