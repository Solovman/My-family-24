<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class Chat
{
	public ?int $id;
	public int $authorId;
	public string $authorName;
	public string $authorFileName;
	public int $recipientId;
	public string $recipientName;
	public string $recipientFileName;

	public ?string $createdAt;

	/**
	 * @param $authorName
	 * @param $recipientName
	 */
	public function __construct(
		$authorId,
		$authorName,
		$authorFileName,
		$recipientId,
		$recipientName,
		$recipientFileName,
		$createdAt,
		$id = null,
	)
	{
		$this->authorId = $authorId;
		$this->authorName = $authorName;
		$this->authorFileName = $authorFileName;
		$this->recipientId = $recipientId;
		$this->recipientName = $recipientName;
		$this->recipientFileName = $recipientFileName;
		$this->createdAt = $createdAt;
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