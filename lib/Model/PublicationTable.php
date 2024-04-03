<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\TextField,
	Bitrix\Main\Type\DateTime;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class PublicationTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> AUTHOR_ID int mandatory
 * <li> MESSAGE text mandatory
 * <li> CREATED_AT datetime optional default current datetime
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
				'AUTHOR_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('PUBLICATION_ENTITY_AUTHOR_ID_FIELD')
				]
			),
			new TextField(
				'MESSAGE',
				[
					'required' => true,
					'title' => Loc::getMessage('PUBLICATION_ENTITY_MESSAGE_FIELD')
				]
			),
			new DatetimeField(
				'CREATED_AT',
				[
					'default' => function()
					{
						return new DateTime();
					},
					'title' => Loc::getMessage('PUBLICATION_ENTITY_CREATED_AT_FIELD')
				]
			),
			'PUBLICATION_USER' => (new Reference(
				'PUBLICATION_USER',
				UserTable::class,
				Join::on('this.AUTHOR_ID', 'ref.ID')
			)) ->configureJoinType('inner'),

			'PUBLICATION_COMMENT' => (new OneToMany('PUBLICATION_COMMENT', CommentTable::class, 'COMMENT_PUBLICATION'))->configureJoinType('inner')
		];
	}
}