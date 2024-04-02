<?php

declare(strict_types=1);

namespace Bitrix\Relation;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Person\PersonTable;

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

            new Reference(
                'PARENT_PERSON',
                PersonTable::class,
                ['=this.PARENT_ID' => 'ref.ID']
            ),

            new Reference(
                'CHILD_PERSON',
                PersonTable::class,
                ['=this.CHILD_ID' => 'ref.ID']
            ),
		];
	}
}