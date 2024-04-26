<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\TextField,
	Bitrix\Main\Type\DateTime;
use Bitrix\Main\ORM\Query\Join;
use Bitrix\Main\ORM\Fields\Relations\Reference;

Loc::loadMessages(__FILE__);

/**
 * Class MessageTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> CHAT_ID int mandatory
 * <li> AUTHOR_ID int mandatory
 * <li> MESSAGE text mandatory
 * <li> CREATED_AT datetime optional default current datetime
 * </ul>
 *
 * @package Bitrix\Message
 **/

class MessageTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_message';
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
					'title' => Loc::getMessage('MESSAGE_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'CHAT_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('MESSAGE_ENTITY_CHAT_ID_FIELD')
				]
			),
			new IntegerField(
				'AUTHOR_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('MESSAGE_ENTITY_AUTHOR_ID_FIELD')
				]
			),
			new TextField(
				'MESSAGE',
				[
					'required' => true,
					'title' => Loc::getMessage('MESSAGE_ENTITY_MESSAGE_FIELD')
				]
			),
			new DatetimeField(
				'CREATED_AT',
				[
					'default' => function()
					{
						return new DateTime();
					},
					'title' => Loc::getMessage('MESSAGE_ENTITY_CREATED_AT_FIELD')
				]
			),

			'AUTHOR_DATA' => (new Reference(
				'AUTHOR_DATA',
				UserTable::class,
				Join::on('this.AUTHOR_ID', 'ref.ID')
			))->configureJoinType('inner'),

			'MESSAGE_CHAT' => (new Reference(
				'MESSAGE_CHAT',
				ChatTable::class,
				Join::on('this.CHAT_ID', 'ref.ID')
			))->configureJoinType('inner'),
		];
	}
}
