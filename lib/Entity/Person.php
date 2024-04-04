<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use Bitrix\Main\Type\Date;

class Person implements Entity
{
	private ?int $id;
	private int $imageId;
	private string $name;
	private string $surname;
	private ?Date $birthDate;
	private ?Date $deathDate;
	private string $gender;
	private int $treeId;

	/**
	 * @param $imageId
	 * @param $name
	 * @param $surname
	 * @param $birthDate
	 * @param $deathDate
	 * @param $gender
	 * @param $treeId
	 */
	public function __construct($imageId, $name, $surname, $birthDate, $deathDate, $gender, $treeId)
	{
		$this->imageId = $imageId;
		$this->name = $name;
		$this->surname = $surname;
		$this->birthDate = $birthDate;
		$this->deathDate = $deathDate;
		$this->gender = $gender;
		$this->treeId = $treeId;
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
	public function getSurname(): string
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
	public function getBirthDate(): ?Date
	{
		return $this->birthDate;
	}

	/**
	 * @param mixed $birthDate
	 */
	public function setBirthDate(?Date $birthDate): void
	{
		$this->birthDate = $birthDate;
	}

	public function getDeathDate(): ?Date
	{
		return $this->deathDate;
	}

	public function setDeathDate(?Date $deathDate): void
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
}