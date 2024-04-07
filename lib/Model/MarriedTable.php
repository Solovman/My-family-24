<?php

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class MarriedTable
 *
 * Fields:
 * <ul>
 * <li> PERSON_ID int mandatory
 * <li> PARTNER_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Relation
 **/

class MarriedTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_relation_married';
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
				'PERSON_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('MARRIED_ENTITY_PERSON_ID_FIELD')
				]
			),
			new IntegerField(
				'PARTNER_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('MARRIED_ENTITY_PARTNER_ID_FIELD')
				]
			),

			'PARTNER_PERSON' => (new Reference(
				'PARENT_PERSON',
				PersonTable::class,
				Join::on('this.PARTNER_ID', 'ref.ID')
			)) ->configureJoinType('inner'),

			'RELATION_PERSON_PARTNER' => (new Reference(
				'RELATION_PERSON_PARTNER',
				PersonTable::class,
				Join::on('this.PERSON_ID', 'ref.ID')
			)) ->configureJoinType('inner'),
		];
	}
}