<?php

declare(strict_types=1);

namespace Bitrix\Comment;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\TextField;

Loc::loadMessages(__FILE__);

/**
 * Class CommentTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> PARENT_ID int optional
 * <li> PUBLICATION_ID int mandatory
 * <li> USER_ID int mandatory
 * <li> COMMENT text mandatory
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
				'PARENT_ID',
				[
					'title' => Loc::getMessage('COMMENT_ENTITY_PARENT_ID_FIELD')
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
				'USER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('COMMENT_ENTITY_USER_ID_FIELD')
				]
			),
			new TextField(
				'COMMENT',
				[
					'required' => true,
					'title' => Loc::getMessage('COMMENT_ENTITY_COMMENT_FIELD')
				]
			),
		];
	}
}