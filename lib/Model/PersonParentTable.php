<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class PersonParentTable
 *
 * Fields:
 * <ul>
 * <li> PARENT_ID int mandatory
 * <li> CHILD_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Relation
 **/

class PersonParentTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_relation_person_parent';
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
					'title' => Loc::getMessage('PERSON_PARENT_ENTITY_PARENT_ID_FIELD')
				]
			),
			new IntegerField(
				'CHILD_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('PERSON_PARENT_ENTITY_CHILD_ID_FIELD')
				]
			),
			'PARENT_PERSON' => (new Reference(
				'PARENT_PERSON',
				PersonTable::class,
				Join::on('this.PARENT_ID', 'ref.ID')
			)) ->configureJoinType('inner'),

			'CHILD_PERSON' => (new Reference(
				'CHILD_PERSON',
				PersonTable::class,
				Join::on('this.CHILD_ID', 'ref.ID')
			)) ->configureJoinType('inner'),

		];
	}
}