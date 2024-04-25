<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Exception;
use Up\Tree\Entity\Message;
use Up\Tree\Model\MessageTable;
use Bitrix\Main\DB\SqlException;

class MessageService
{
	/**
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
}