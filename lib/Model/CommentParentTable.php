<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;

Loc::loadMessages(__FILE__);

/**
 * Class CommentParentTable
 *
 * Fields:
 * <ul>
 * <li> PARENT_ID int mandatory
 * <li> CHILD_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Relation
 **/

class CommentParentTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_relation_comment_parent';
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
				'PARENT_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('COMMENT_PARENT_ENTITY_PARENT_ID_FIELD')
				]
			),
			new IntegerField(
				'CHILD_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('COMMENT_PARENT_ENTITY_CHILD_ID_FIELD')
				]
			),
		];
	}
}