<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use Bitrix\Main\Type\Date;

class Subscription
{
	public int $id;
	public string $level;
	public int $price;
	public int $numberTrees;
	public int $numberNodes;
	public int $customization;
	public string $subscriptionType;
	public ?Date $startData;
	public ?Date $endData;

	public function __construct(
		$id,
		$level,
		$price,
		$numberTrees,
		$numberNodes,
		$customization,
		$subscriptionType,
		$startData,
		$endData
	)
	{
		$this->id = $id;
		$this->level = $level;
		$this->price = $price;
		$this->numberTrees = $numberTrees;
		$this->numberNodes = $numberNodes;
		$this->customization = $customization;
		$this->subscriptionType = $subscriptionType;
		$this->startData = $startData;
		$this->endData = $endData;

	}
}