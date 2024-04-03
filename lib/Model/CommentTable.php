<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\TextField,
	Bitrix\Main\Type\DateTime;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class CommentTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> PUBLICATION_ID int mandatory
 * <li> AUTHOR_ID int mandatory
 * <li> COMMENT text mandatory
 * <li> CREATED_AT datetime optional default current datetime
 * </ul>
 *
 * @package Bitrix\Comment
 **/

class CommentTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_comment';
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
					'title' => Loc::getMessage('COMMENT_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'PUBLICATION_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('COMMENT_ENTITY_PUBLICATION_ID_FIELD')
				]
			),
			new IntegerField(
				'AUTHOR_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('COMMENT_ENTITY_AUTHOR_ID_FIELD')
				]
			),
			new TextField(
				'COMMENT',
				[
					'required' => true,
					'title' => Loc::getMessage('COMMENT_ENTITY_COMMENT_FIELD')
				]
			),
			new DatetimeField(
				'CREATED_AT',
				[
					'default' => function()
					{
						return new DateTime();
					},
					'title' => Loc::getMessage('COMMENT_ENTITY_CREATED_AT_FIELD')
				]
			),
			'COMMENT_PUBLICATION' => (new Reference(
				'COMMENT_PUBLICATION',
				PublicationTable::class,
				Join::on('this.PUBLICATION_ID', 'ref.ID')
			)) ->configureJoinType('inner'),
		];
	}
}