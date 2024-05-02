<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\Message;
use Up\Tree\Model\ChatTable;
use Up\Tree\Model\MessageTable;
use Bitrix\Main\DB\SqlException;


class MessageService
{

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getLastMessages(int $chatId): string
	{
		$result = MessageTable::query()
			->setSelect(['MESSAGE'])
			->setFilter(['CHAT_ID' => $chatId])
			->setOrder(['ID'=>'DESC'])
			->setLimit(1)
			->exec()
			->fetchObject();

		return $result->getMessage();
	}

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

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function isUserChatParticipant(int $currentChatId , int $userId): bool
	{
		$chatIds = ChatTable::query()->setSelect(['ID'])
							->setFilter(['LOGIC' => 'OR', 'RECIPIENT_ID' => $userId, 'AUTHOR_ID' => $userId])
							->exec()
							->fetchAll();
		$idsForCurrentUser = [];
		foreach ($chatIds as $chatId)
		{
			$idsForCurrentUser[] = (int)$chatId['ID'];
		}

		return in_array($currentChatId, $idsForCurrentUser, true);
	}
}