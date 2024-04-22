<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use Bitrix\Main\Type\Date;

class UserSubscription
{
	public int $id;
	public int $subscriptionId;
	public int $countTrees;
	public int $countNodes;
	public ?Date $buyTime;
	public int $isActive;

	public function __construct(
		$id,
		$subscriptionId,
		$countTrees,
		$countNodes,
		$buyTime,
		$isActive,
	)
	{
		$this->id = $id;
		$this->subscriptionId = $subscriptionId;
		$this->countTrees = $countTrees;
		$this->countNodes = $countNodes;
		$this->buyTime = $buyTime;
		$this->isActive = $isActive;
	}
}