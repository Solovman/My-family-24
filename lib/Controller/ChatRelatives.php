<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Message;
use Up\Tree\Services\Repository\ChatService;
use Up\Tree\Services\Repository\MessageService;
use Up\Tree\Services\Repository\SearchService;
use Up\Tree\Services\Repository\TreeService;

class ChatRelatives extends Engine\Controller
{

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getChatsAction(): array
	{
		$chats = ChatService::getChatsForCurrentUser();

		return [
			'listChats'  => $chats
		];
	}

	/**
	 * @throws SqlException
	 */
	public static function addMessagesAction(int $recipientId, string $message, int $isAdmin): bool
	{
		global $USER;

		$authorId = (int) $USER->GetID();

		$chatId = self::addChatAction($recipientId, $authorId, $isAdmin);

		if (!$chatId)
		{
			return false;
		}

		$messageResult = new Message(
			$chatId,
			$authorId,
			$message
		);

		try
		{
			MessageService::addMessage($messageResult);
			return true;
		}
		catch (SqlException)
		{
			throw new SqlException('Error adding a chat');
		}
	}

	/**
	 * @throws ArgumentException
	 * @throws SqlException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	private static function addChatAction(int $recipientId, int $authorId, int $isAdmin): bool|int
	{
		if ($isAdmin !== 1)
		{
			$treesIds = TreeService::getTreesByUserNotSecure();

			$matchListPersonsUsers = SearchService::getFoundUserInfo($treesIds)['foundUsers'];

			$userIds = [];

			foreach ($matchListPersonsUsers as $user)
			{
				$userIds[] = (int) $user['ID'];
			}

			if (!in_array($recipientId, $userIds, true))
			{
				return false;
			}
		}
		else
		{
			$recipientId = 1;
		}

		try
		{
			return ChatService::addChat($recipientId, $authorId, $isAdmin);
		}
		catch (SqlException)
		{
			throw new SqlException('Error adding a chat');
		}
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function searchChatByRecipientIdAction(int $recipientId): bool
	{
		return ChatService::searchChatByRecipientId($recipientId);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getIdChatWithAdminAction(): int|bool
	{
		return ChatService::getIdChatWithAdmin();
	}
}