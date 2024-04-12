<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class Subscription
{
	public int $id;
	public string $level;
	public int $price;
	public int $numberTrees;

	public function __construct($id, $level, $price, $numberTrees)
	{
		$this->id = $id;
		$this->level = $level;
		$this->price = $price;
		$this->numberTrees = $numberTrees;
	}
}