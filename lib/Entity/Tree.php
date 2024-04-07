<?php

declare(strict_types=1);

namespace Up\Tree\Entity;


use Bitrix\Main\Type\DateTime;

class Tree implements Entity
{
	public ?int $id;
	public string $title;
	public int $userId;
	public ?DateTime $createdAt;
	public array $familyRelations = [];
	public array $familyRelationsMarried = [];
	public array $persons = [];


	public function __construct($title, $userId, $createdAt)
	{
		$this->title = $title;
		$this->userId = $userId;
		$this->createdAt = $createdAt;
	}

	/**
	 * @return int|null
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * @param mixed $id
	 */
	public function setId(?int $id): void
	{
		$this->id = $id;
	}

	/**
	 * @return mixed
	 */
	public function getTitle(): string
	{
		return $this->title;
	}

	/**
	 * @param mixed $title
	 */
	public function setTitle(string $title): void
	{
		$this->title = $title;
	}

	/**
	 * @return int
	 */
	public function getUserId(): int
	{
		return $this->userId;
	}

	/**
	 * @param int|null $userId
	 */
	public function setUserId(?int $userId): void
	{
		$this->userId = $userId;
	}

	/**
	 * @return DateTime|null
	 */
	public function getCreatedAt(): ?DateTime
	{
		return $this->createdAt;
	}

	/**
	 * @param mixed $createdAt
	 */
	public function setCreatedAt(?DateTime $createdAt): void
	{
		$this->createdAt = $createdAt;
	}

	public function addFamilyRelation(FamilyRelation $relation): void
	{
		$this->familyRelations[] = $relation;
	}

	public function addFamilyRelationMarried(FamilyRelationMarried $relation): void
	{
		$this->familyRelationsMarried[] = $relation;
	}

	public function getFamilyRelations(): array
	{
		return $this->familyRelations;
	}

	public function addPerson(Person $person): void
	{
		$this->persons[] = $person;
	}

	public function getPersons(): array
	{
		return $this->persons;
	}
}