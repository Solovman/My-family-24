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
	public static function getChatIdsForCurrentUser(): array
	{
		global $USER;
		$recipientId = $USER->GetID();
		$chats = ChatTable::query()
										  ->setSelect(['ID'])
										  ->where('RECIPIENT_ID', $recipientId)
										  ->exec();

		$chatIds = [];

		while($result = $chats->fetchObject())
		{
			$chatIds[] = $result->getId();

		}

		return $chatIds;
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