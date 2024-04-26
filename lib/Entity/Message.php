<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

class Message
{
	public ?int $id;
	public int $chatId;
	public int $authorId;
	public string $message;
	public ?string $createdAt;
	public ?string $authorName;
	public ?string $recipientName;

	public function __construct(
		$chatId,
		$authorId,
		$message,
		$createdAt = null,
		$id = null,
		$authorName = null,
		$recipientName = null,
	)
	{
		$this->chatId = $chatId;
		$this->authorId = $authorId;
		$this->message = $message;
		$this->createdAt = $createdAt;
		$this->id = $id;
		$this->authorName = $authorName;
		$this->recipientName = $recipientName;
	}

	public function getId(): int
	{
		return $this->id;
	}

	public function setId(int $id): void
	{
		$this->id = $id;
	}

	public function getChatId(): int
	{
		return $this->chatId;
	}

	public function setChatId(int $chatId): void
	{
		$this->chatId = $chatId;
	}

	public function getAuthorId(): int
	{
		return $this->authorId;
	}

	public function setAuthorId(int $authorId): void
	{
		$this->authorId = $authorId;
	}

	public function getMessage(): string
	{
		return $this->message;
	}

	public function setMessage(string $message): void
	{
		$this->message = $message;
	}

	public function getCreatedAt(): string
	{
		return $this->createdAt;
	}

	public function setCreatedAt(string $createdAt): void
	{
		$this->createdAt = $createdAt;
	}
}