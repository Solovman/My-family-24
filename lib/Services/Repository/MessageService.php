<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\Type\DateTime;
use Exception;
use Up\Tree\Entity\Message;
use Up\Tree\Model\MessageTable;
use Bitrix\Main\DB\SqlException;
use Up\Tree\Model\UserTable;

class MessageService
{
	/**
	 * @throws SqlException
	 * @throws Exception
	 */
	public static function addMessage(Message $message): int|array
	{
		$messageData = [
			"CHAT_ID" => $message->getChatId(),
			"AUTHOR_ID" => $message->getAuthorId(),
			"MESSAGE" => $message->getMessage(),
		];

		$result = MessageTable::add($messageData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error adding a message");
	}

	public static function getMessagesByChatId(int $chatId): array
	{
		$messages = MessageTable::query()
			->setSelect(['ID', 'CHAT_ID', 'AUTHOR_ID', 'MESSAGE', 'CREATED_AT', 'AUTHOR_DATA_NAME' => 'AUTHOR_DATA.NAME'])
			->setFilter(['CHAT_ID' => $chatId])
			->exec();


		$messagesList = [];

		while($result = $messages->fetchObject())
		{
			$messagesList[] = new Message(
				$result->getChatId(),
				$result->getAuthorId(),
				$result->getMessage(),
				$result->getCreatedAt()  ? $result->getCreatedAt() ->format('Y-m-d H:i:s') : null,
				$result->getId(),
				$result->getAuthorData()->getName()
			);
		}

		return $messagesList;
	}
}

