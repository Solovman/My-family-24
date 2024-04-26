<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class User
{
	public int $id;
	public string $login;
	public string $name;
	public string $lastName;
	public static $active;
	public function __construct(
		$id,
		$login,
		$name,
		$lastName,
		$active
	)
	{
		$this->id = $id;
		$this->login = $login;
		$this->name = $name;
		$this->lastName = $lastName;
		$this->active = $active;
	}
}