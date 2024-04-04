<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use Bitrix\Main\Type\DateTime;

class Person implements Entity
{
	private ?int $id;
	private ?int $imageId;
	private string $name;
	private string $surname;
	private $birthDate;
	private $deathDate;
	private string $gender;
	private int $treeId;

	/**
	 * @param $id
	 * @param $imageId
	 * @param $name
	 * @param $surname
	 * @param $birthDate
	 * @param $deathDate
	 * @param $gender
	 * @param $treeId
	 */
	public function __construct($id, $imageId, $name, $surname, $birthDate, $deathDate, $gender, $treeId)
	{
		$this->id = $id;
		$this->imageId = $imageId;
		$this->name = $name;
		$this->surname = $surname;
		$this->birthDate = $birthDate;
		$this->deathDate = $deathDate;
		$this->gender = $gender;
		$this->treeId = $treeId;
	}

	/**
	 * @return mixed
	 */
	public function getId()
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
	 * @return mixed
	 */
	public function getImageId()
	{
		return $this->imageId;
	}

	/**
	 * @param mixed $imageId
	 */
	public function setImageId($imageId): void
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
	 * @return mixed
	 */
	public function getSurname()
	{
		return $this->surname;
	}

	/**
	 * @param mixed $surname
	 */
	public function setSurname($surname): void
	{
		$this->surname = $surname;
	}

	/**
	 * @return mixed
	 */
	public function getBirthDate()
	{
		return $this->birthDate;
	}

	/**
	 * @param mixed $birthDate
	 */
	public function setBirthDate($birthDate): void
	{
		$this->birthDate = $birthDate;
	}

	public function getDeathDate()
	{
		return $this->deathDate;
	}

	public function setDeathDate($deathDate): void
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