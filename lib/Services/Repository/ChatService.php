<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Up\Tree\Entity\Chat;
use Up\Tree\Model\ChatTable;
use Bitrix\Main\DB\SqlException;

class ChatService
{
	/**
	 * @throws Exception
	 * @throws SqlException
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
}
