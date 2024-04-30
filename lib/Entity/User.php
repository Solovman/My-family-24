<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class User
{
	public int $id;
	public string $email;
	public string $name;
	public string $lastName;
	public static $active;
	public function __construct(
		$id,
		$email,
		$name,
		$lastName,
		$active
	)
	{
		$this->id = $id;
		$this->email = $email;
		$this->name = $name;
		$this->lastName = $lastName;
		$this->active = $active;
	}
}