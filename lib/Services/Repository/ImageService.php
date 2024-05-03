<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Up\Tree\Entity\Image;
use Up\Tree\Model\FileTable;
use Up\Tree\Model\UserTable;

class ImageService
{
	public static function addImage(Image $image)
	{
		$file = [
			'FILE_NAME' => $image->fileName
		];

		$result = FileTable::add($file);

		if ($result->isSuccess())
		{
			return $result->getId();
		}

		throw new SqlException("Error creating image");
	}

	/**
	 * @throws ArgumentException
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 */
	public static function getImageNameByPerson(int $personImageID): string
	{
		$imageName = FileTable::query()->setSelect(['FILE_NAME', 'SUBDIR'])
			->setFilter(['ID' => $personImageID])
			->exec()
			->fetchObject();

		if ($personImageID === 1)
		{
			return $imageName->getFileName();
		}

		return '/upload/' . $imageName->getSubdir(). '/' . $imageName->getFileName();
	}

	/**
	 * @throws ObjectPropertyException
	 * @throws SystemException
	 * @throws ArgumentException
	 */
	public static function getAvatars(): array
	{
		return FileTable::query()
							->setSelect(['ID', 'FILE_NAME'])
							->setFilter(['SUBDIR' => 'avatars'])
							->exec()
							->fetchAll();
	}
}