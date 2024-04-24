<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use Bitrix\Main\Type\Date;

class UserSubscription
{
	public int $userId;
	public int $subscriptionId;
	public int $countTrees;
	public int $countNodes;
	public ?string $buyTime;

	public function __construct(
		$userId,
		$subscriptionId,
		$countTrees,
		$countNodes,
		$buyTime,
	)
	{
		$this->userId = $userId;
		$this->subscriptionId = $subscriptionId;
		$this->countTrees = $countTrees;
		$this->countNodes = $countNodes;
		$this->buyTime = $buyTime;
	}
}