<?php

declare(strict_types=1);

namespace Bitrix\Publication;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\TextField;

Loc::loadMessages(__FILE__);

/**
 * Class PublicationTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> USER_ID int mandatory
 * <li> MESSAGE text mandatory
 * </ul>
 *
 * @package Bitrix\Publication
 **/

class PublicationTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_publication';
	}

	/**
	 * Returns entity map definition.
	 *
	 * @return array
	 */
	public static function getMap()
	{
		return [
			new IntegerField(
				'ID',
				[
					'primary' => true,
					'autocomplete' => true,
					'title' => Loc::getMessage('PUBLICATION_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('PUBLICATION_ENTITY_USER_ID_FIELD')
				]
			),
			new TextField(
				'MESSAGE',
				[
					'required' => true,
					'title' => Loc::getMessage('PUBLICATION_ENTITY_MESSAGE_FIELD')
				]
			),
		];
	}
}