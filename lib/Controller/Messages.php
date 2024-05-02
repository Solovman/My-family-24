<?php

declare(strict_types=1);

namespace Up\Tree\Controller;
use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Engine;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\Message;
use Up\Tree\Services\Repository\MessageService;

class Messages extends Engine\Controller
{
	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getLastMessageAction(int $chatId): string
	{
		return MessageService::getLastMessages($chatId);
	}

	public static function getMessagesAction(int $chatId): array
	{
		$messages = MessageService::getMessagesByChatId($chatId);

		return [
			'listMessages'  => $messages
		];
	}

	/**
	 * @throws Exception
	 * @throws SqlException
	 */
	public static function addMessageAction(int $chatId, string $message): void
	{
		global $USER;

		$authorId = (int)$USER->GetID();

		$messageResult = new Message(
			$chatId,
			$authorId,
			$message
		);

		try {
			MessageService::addMessage($messageResult);
		}
		catch (SqlException)
		{
			throw new SqlException('Error adding a message');
		}
	}
}