<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class Purchase
{
	public ?int $id;
	public string $title;
	public int $price;

	public function __construct(
		$id,
		$title,
		$price,
	)
	{
		$this->id = $id;
		$this->title = $title;
		$this->price = $price;
	}
}