<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\User;
use Up\Tree\Model\UserTable;

class UserService
{
	/**
	 * @throws Exception
	 */

	public static function getList(): array
	{
		$users = UserTable::query()
			->setSelect(['ID', 'EMAIL', 'NAME', 'LAST_NAME', 'ACTIVE'])
			->exec();

		$usersList = [];

		while ($result = $users->fetchObject())
		{
			$usersList[] = new User(
				$result->getId(),
				$result->getEmail(),
				$result->getName(),
				$result->getLastName(),
				$result->getActive()
			);
		}

		return $usersList;
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

	/**
	 * @throws Exception
	 */
	public static function updateUserImagesByAvatarId(int $avatarId): bool
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$result = UserTable::update($userId, ['PERSONAL_PHOTO' => $avatarId]);

		if (!$result->isSuccess())
		{
			return false;
		}

		return true;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getUserFileName(): array
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$avatars = UserTable::query()
			->setSelect(['FILE_NAME' => 'USER_DATA.FILE_NAME'])
			->setFilter(['ID' => $userId])
			->exec()
			->fetchObject();

		return [
			'ID' => $avatars->getUserData()->getId(),
			'FILE_NAME' => $avatars->getUserData()->getFileName()
		];
	}
}