<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\Chat;
use Up\Tree\Model\ChatTable;
use Up\Tree\Services\QueryHelperService;

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
		$recipientId = (int)$USER->GetID();
		$chats = ChatTable::query()
			->setSelect([
							'ID',
							'AUTHOR_ID', 'RECIPIENT_ID',
							'AUTHOR_DATA_NAME' => 'AUTHOR_DATA.NAME',
							'AUTHOR_DATA_SURNAME' => 'AUTHOR_DATA.LAST_NAME',
							'AUTHOR_DATA_FILE_NAME' => 'AUTHOR_DATA.USER_DATA.FILE_NAME',
							'RECIPIENT_DATA_NAME' => 'RECIPIENT_DATA.NAME',
							'RECIPIENT_DATA_SURNAME' => 'RECIPIENT_DATA.LAST_NAME',
							'RECIPIENT_DATA_FILE_NAME' => 'RECIPIENT_DATA.USER_DATA.FILE_NAME',
							'IS_ADMIN',
							'CREATED_AT'
						])
			->setFilter([
							'LOGIC' => 'OR',
							'RECIPIENT_ID' => $recipientId,
							'AUTHOR_ID' => $recipientId
						])
			->exec();

		$chatsList = [];

		while ($result = $chats->fetchObject()) {
			$chatsList[] = new Chat(
				$result->getAuthorId(),
				$result->getAuthorData()->getName() . ' ' . $result->getAuthorData()->getLastName(),
				$result->getAuthorData()->getUserData()->getFileName(),
				$result->getRecipientId(),
				$result->getRecipientData()->getName() . ' ' . $result->getRecipientData()->getLastName(),
				$result->getRecipientData()->getUserData()->getFileName(),
				$result->getIsAdmin(),
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
	public static function addChat(int $recipientId, int $authorId, int $isAdmin): int|array
	{
		$chatData = [
			"AUTHOR_ID" => $authorId,
			"RECIPIENT_ID" => $recipientId,
			"IS_ADMIN" => $isAdmin
		];

		$result = ChatTable::add($chatData);

		$chatId = QueryHelperService::checkQueryResult($result, true);

		if ($chatId === false)
		{
			throw new SqlException("Error adding a chat");
		}
		return $chatId;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function searchChatByRecipientId(int $recipientId): bool
	{
		global $USER;

		$userId = (int)$USER->GetID();

		$result = ChatTable::query()
			->setSelect(['ID'])
			->setFilter(['RECIPIENT_ID' => $recipientId, 'AUTHOR_ID' => $userId])
			->exec()
			->fetchObject();

		return $result !== null;
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getIdChatWithAdmin(): int|bool
	{
		$chatId = ChatTable::query()
			->setSelect(['ID'])
			->setFilter(['IS_ADMIN' => 1])
			->exec()
			->fetchObject();

		return QueryHelperService::checkQueryResult($chatId, true);
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getParticipantsByChatId(int $chatId): array
	{
		$participants = ChatTable::query()
			->setSelect(['AUTHOR_ID', 'RECIPIENT_ID'])
			->setFilter(['ID' => $chatId])
			->exec()
			->fetchObject();


		return [
			'authorId' => $participants->getAuthorId(),
			'recipientId' => $participants->getRecipientId()
		];
	}
}