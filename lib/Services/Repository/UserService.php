<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\Security\Password;
use Bitrix\Main\SystemException;
use Bitrix\Main\Type\DateTime;
use Exception;
use Up\Tree\Model\UserTable;

class UserService
{
	/**
	 * @throws Exception
	 */
	static function addUser($email, $name, $password): int|array
	{
		$passwordHash = Password::hash($password);

		$userData = [
			"NAME" => $name,
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
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getUserNameById(): ?string
	{
		global $USER;

		if ($USER->IsAuthorized())
		{
			$userId = (int) $USER->GetID();
			$user = UserTable::getList([
										   'filter' => ['=ID' => $userId],
										   'select' => ['NAME']
									   ])->fetch();

			if ($user)
			{
				return $user['NAME'];
			}
		}
		return null;
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getUserDataById(): array
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$data = UserTable::query()
			->setSelect(['NAME', 'LAST_NAME'])
			->setFilter(['ID' => $userId])
			->exec()
			->fetchObject();

		return [
			'name' => $data->getName(),
			'surname' => $data->getLastName()
		];
	}
}