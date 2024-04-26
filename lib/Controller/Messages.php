<?php

declare(strict_types=1);

namespace Up\Tree\Controller;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\Engine;
use Exception;
use Up\Tree\Entity\Message;
use Up\Tree\Services\Repository\MessageService;

class Messages extends Engine\Controller
{
	public static function getMessagesAction(int $chatId): array
	{

		$messages = MessageService::getMessagesByChatId((int)$chatId);

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