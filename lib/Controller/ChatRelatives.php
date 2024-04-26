<?php

namespace Up\Tree\Controller;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Chat;
use Up\Tree\Entity\Message;
use Up\Tree\Services\Repository\ChatService;
use Up\Tree\Services\Repository\MessageService;

class ChatRelatives extends Engine\Controller
{

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getChatsAction(): array
	{

		$chatsRelation = ChatService::getChatsForCurrentUser();

		return [
			//'listChats'  => $chats
		];
	}

	/**
	 * @throws SqlException
	 */
	public static function addMessagesAction(int $recipientId, string $message): void
	{
		global $USER;

		$authorId = (int) $USER->GetID();

		$messageResult = new Message(
			self::addChatAction($recipientId, $authorId),
			$authorId,
			$message
		);

		try {
			MessageService::addMessage($messageResult);
		}
		catch (SqlException)
		{
			throw new SqlException('Error adding a chat');
		}
	}

	private static function addChatAction(int $recipientId, int $authorId): array|int
	{
		$chatResult = new Chat(
			$authorId,
			$recipientId
		);

		try {
			return ChatService::addChat($chatResult);
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
}