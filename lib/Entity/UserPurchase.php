<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class UserPurchase
{
	public int $userId;
	public int $singlePurchaseId;

	public function __construct(
		$userId,
		$singlePurchaseId,
	)
	{
		$this->userId = $userId;
		$this->singlePurchaseId = $singlePurchaseId;
	}
}