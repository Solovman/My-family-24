<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class FamilyRelation
{
	private int $parentId;

	private int $childId;

	/**
	 * @param int $parentId
	 * @param int $childId
	 */
	public function __construct(int $parentId, int $childId)
	{
		$this->parentId = $parentId;
		$this->childId = $childId;
	}

	public function getParentId(): int
	{
		return $this->parentId;
	}

	public function setParentId(int $parentId): void
	{
		$this->parentId = $parentId;
	}

	public function getChildId(): int
	{
		return $this->childId;
	}

	public function setChildId(int $childId): void
	{
		$this->childId = $childId;
	}
}