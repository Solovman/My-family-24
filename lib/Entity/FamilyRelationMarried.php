<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class FamilyRelationMarried
{
	private int $personID;

	private int $partnerID;

	/**
	 * @param int $personID
	 * @param int $partnerID
	 */
	public function __construct(int $personID, int $partnerID)
	{
		$this->personID = $personID;
		$this->partnerID = $partnerID;
	}

	public function getPartnerId(): int
	{
		return $this->partnerID;
	}

	public function getPersonId(): int
	{
		return $this->personID;
	}
}