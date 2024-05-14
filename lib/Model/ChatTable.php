<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\Type\DateTime;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class ChatTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> AUTHOR_ID int mandatory
 * <li> RECIPIENT_ID int mandatory
 * <li> CREATED_AT datetime optional default current datetime
 * </ul>
 *
 * @package Bitrix\Chat
 **/

class ChatTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_chat';
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
					'title' => Loc::getMessage('CHAT_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'AUTHOR_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('CHAT_ENTITY_AUTHOR_ID_FIELD')
				]
			),
			new IntegerField(
				'RECIPIENT_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('CHAT_ENTITY_RECIPIENT_ID_FIELD')
				]
			),
			new IntegerField(
				'IS_ADMIN',
				[
					'default' => 0,
					'title' => Loc::getMessage('PERSON_ENTITY_ACTIVE_FIELD')
				]
			),
			new DatetimeField(
				'CREATED_AT',
				[
					'default' => function()
					{
						return new DateTime();
					},
					'title' => Loc::getMessage('CHAT_ENTITY_CREATED_AT_FIELD')
				]
			),
			'CHAT_MESSAGE' => (new OneToMany('CHAT_MESSAGE', MessageTable::class, 'MESSAGE_CHAT'))->configureJoinType('inner'),

			'AUTHOR_DATA' => (new Reference(
				'AUTHOR_DATA',
				UserTable::class,
				Join::on('this.AUTHOR_ID', 'ref.ID')
			))->configureJoinType('inner'),

			'RECIPIENT_DATA' => (new Reference(
				'RECIPIENT_DATA',
				UserTable::class,
				Join::on('this.RECIPIENT_ID', 'ref.ID')
			))->configureJoinType('inner'),
		];
	}
}

