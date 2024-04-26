<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class Chat
{
	public ?int $id;
	public int $authorId;
	public int $recipientId;

	public string $createdAt;

	/**
	 * @param $authorId
	 * @param $recipientId
	 */
	public function __construct(
		$authorId,
		$recipientId,
		$id = null
	)
	{
		$this->authorId = $authorId;
		$this->recipientId = $recipientId;
		$this->id = $id;
	}

	public function getCreatedAt(): string
	{
		return $this->createdAt;
	}

	public function setCreatedAt(string $createdAt): void
	{
		$this->createdAt = $createdAt;
	}

	public function getRecipientId(): int
	{
		return $this->recipientId;
	}

	public function setRecipientId(int $recipientId): void
	{
		$this->recipientId = $recipientId;
	}

	public function getAuthorId(): int
	{
		return $this->authorId;
	}

	public function setAuthorId(int $authorId): void
	{
		$this->authorId = $authorId;
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function setId(int $id): void
	{
		$this->id = $id;
	}

}