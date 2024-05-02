<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use Bitrix\Main\Type\Date;

class Person implements Entity
{
	public ?int $id;
	public string $active;
	public int $imageId;
	public string $photo;
	public string $name;
	public ?string $surname;
	public ?string $birthDate;
	public ?string $deathDate;
	public string $gender;
	public int $treeId;
	public ?int $userId;
	public ?float $weight;
	public ?float $height;
	public ?string $education;
	public ?string $hash;

	/**
	 * @param $active
	 * @param $imageId
	 * @param $photo
	 * @param $name
	 * @param $surname
	 * @param string|null $birthDate
	 * @param string|null $deathDate
	 * @param $gender
	 * @param $treeId
	 * @param null $userId
	 */
	public function __construct(
		$active,
		$imageId,
		$photo,
		$name,
		$surname,
		?string $birthDate,
		?string $deathDate,
		$gender,
		$treeId,
		$userId = null,
		$weight = null,
		$height = null,
		$education = null,
		$hash = null
	)
	{
		$this->active = $active;
		$this->imageId = $imageId;
		$this->photo = $photo;
		$this->name = $name;
		$this->surname = $surname;
		$this->birthDate = $birthDate;
		$this->deathDate = $deathDate;
		$this->gender = $gender;
		$this->treeId = $treeId;
		$this->userId = $userId;
		$this->weight = $weight;
		$this->height = $height;
		$this->education = $education;
		$this->hash = $hash;
	}

	public function getHash(): ?string
	{
		return $this->hash;
	}

	public function setHash(?string $hash): void
	{
		$this->hash = $hash;
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
	public function setId($id): void
	{
		$this->id = $id;
	}

	public function getActive(): string
	{
		return $this->active;
	}

	/**
	 * @return int
	 */
	public function getImageId(): int
	{
		return $this->imageId;
	}

	/**
	 * @param int $imageId
	 */
	public function setImageId(int $imageId): void
	{
		$this->imageId = $imageId;
	}

	public function getName(): string
	{
		return $this->name;
	}

	public function setName(string $name): void
	{
		$this->name = $name;
	}

	/**
	 * @return string
	 */
	public function getSurname(): ?string
	{
		return $this->surname;
	}

	/**
	 * @param string $surname
	 */
	public function setSurname(string $surname): void
	{
		$this->surname = $surname;
	}

	/**
	 * @return Date|null
	 */
	public function getBirthDate(): ?string
	{
		return $this->birthDate;
	}

	/**
	 * @param mixed $birthDate
	 */
	public function setBirthDate(?string $birthDate): void
	{
		$this->birthDate = $birthDate;
	}

	public function getDeathDate(): ?string
	{
		return $this->deathDate;
	}

	public function setDeathDate(?string $deathDate): void
	{
		$this->deathDate = $deathDate;
	}

	public function getGender(): string
	{
		return $this->gender;
	}

	public function setGender(string $gender): void
	{
		$this->gender = $gender;
	}

	public function getTreeId(): int
	{
		return $this->treeId;
	}

	public function setTreeId(int $treeId): void
	{
		$this->treeId = $treeId;
	}

	public function getWeight(): ?float
	{
		return $this->weight;
	}

	public function getHeight(): ?float
	{
		return $this->height;
	}

	public function getEducationLevel(): ?string
	{
		return $this->education;
	}
}