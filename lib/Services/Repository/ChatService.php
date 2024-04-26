<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\Chat;
use Up\Tree\Model\ChatTable;
use Bitrix\Main\DB\SqlException;

class ChatService
{
	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getChatsForCurrentUser(): array
	{
		global $USER;
		$recipientId = (int) $USER->GetID();
		$chats = ChatTable::query()
			->setSelect(['ID',
				'AUTHOR_ID', 'RECIPIENT_ID',
				'AUTHOR_DATA_NAME' => 'AUTHOR_DATA.NAME',
				'AUTHOR_DATA_SURNAME' => 'AUTHOR_DATA.LAST_NAME',
				'RECIPIENT_DATA_NAME' => 'RECIPIENT_DATA.NAME',
				'RECIPIENT_DATA_SURNAME' => 'RECIPIENT_DATA.LAST_NAME',
				'CREATED_AT'])
			->setFilter([ 'LOGIC' => 'OR', 'RECIPIENT_ID' => $recipientId, 'AUTHOR_ID' => $recipientId])
			->exec();

		$chatsList = [];

		while($result = $chats->fetchObject())
		{
			$chatsList[] = new Chat(
				$result->getAuthorId(),
				$result->getAuthorData()->getName() . ' ' . $result->getAuthorData()->getLastName(),
				$result->getRecipientId(),
				$result->getRecipientData()->getName() . ' ' . $result->getRecipientData()->getLastName(),
				$result->getCreatedAt()->format('Y-m-d H:i:s'),
				$result->getId()
			);
		}

		return $chatsList;
	}

	/**
	 * @throws SqlException
	 * @throws Exception
	 */
	public static function addChat(Chat $chat): int|array
	{
		$chatData = [
			"AUTHOR_ID" => $chat->getAuthorId(),
			"RECIPIENT_ID" => $chat->getRecipientId(),
		];

		$result = ChatTable::add($chatData);
		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error adding a chat");
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function searchChatByRecipientId(int $recipientId): bool
	{
		global $USER;

		$userId = (int) $USER->GetID();

		$result = ChatTable::query()
			->setSelect(['ID'])
			->setFilter(['RECIPIENT_ID' => $recipientId, 'AUTHOR_ID' => $userId])
			->exec()
			->fetchObject();

		return $result !== null;
	}
}