<?php

declare(strict_types=1);

namespace Up\Tree\Entity;


class Subscription
{
	public ?int $id;
	public string $level;
	public int $price;
	public int $numberTrees;
	public int $numberNodes;
	public int $customization;
	public ?int $isActive;

	public function __construct(
		$id,
		$level,
		$price,
		$numberTrees,
		$numberNodes,
		$customization,
		$isActive
	)
	{
		$this->id = $id;
		$this->level = $level;
		$this->price = $price;
		$this->numberTrees = $numberTrees;
		$this->numberNodes = $numberNodes;
		$this->customization = $customization;
		$this->isActive = $isActive;
	}
}