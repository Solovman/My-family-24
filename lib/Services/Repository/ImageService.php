<?php

declare(strict_types=1);

namespace Up\Tree\Services\Repository;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\DB\SqlException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Exception;
use Up\Tree\Entity\Image;
use Up\Tree\Model\FileTable;
use Up\Tree\Model\UserTable;
use Up\Tree\Services\QueryHelperService;


class ImageService
{
	/**
	 * @throws SqlException
	 * @throws Exception
	 */
	public static function addImage(Image $image): bool|int
	{
		$file = [
			'FILE_NAME' => $image->fileName
		];

		$result = FileTable::add($file);

		$imageId = QueryHelperService::checkQueryResult($result, true);

		if ($imageId === false)
		{
			throw new SqlException("Error creating image");
		}
		return $imageId;
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