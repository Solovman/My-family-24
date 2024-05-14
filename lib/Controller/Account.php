<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Services\Repository\ImageService;
use Up\Tree\Services\Repository\SubscriptionsService;
use Up\Tree\Services\Repository\UserService;
use Bitrix\Main\Engine;

class Account extends Engine\Controller
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public function getUserInfoAction(): array
	{
		$subscriptionName = SubscriptionsService::getSubscriptionNameByUser();

		$userData = UserService::getUserDataById();

		return [
			'userInfo' => [$subscriptionName, $userData]
		];
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getAvatarsAction(): array
	{
		$avatars = ImageService::getAvatars();

		return [
			'avatars' => $avatars
		];
	}

	/**
	 * @throws Exception
	 */
	public function updateUserImagesByAvatarIdAction(int $avatarId): bool
	{
		return UserService::updateUserImagesByAvatarId($avatarId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public function getUserFileNameAction(): array
	{
		return UserService::getUserFileName();
	}
}