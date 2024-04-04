<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

interface Entity
{
	public function getId() : ?int;
	public function setId(int $id);
}

