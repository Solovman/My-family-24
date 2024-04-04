<?php

declare(strict_types=1);

namespace Up\Tree\Entity;


use Bitrix\Main\Type\DateTime;

class Tree implements Entity
{
	private ?int $id;
	private string $title;
	private int $userId;
	private ?DateTime $createdAt;

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
}