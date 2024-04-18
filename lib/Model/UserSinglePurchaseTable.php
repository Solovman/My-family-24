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
 * Class UserSinglePurchaseTable
 *
 * Fields:
 * <ul>
 * <li> USER_ID int mandatory
 * <li> SINGLE_PURCHASE_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Relation
 **/

class UserSinglePurchaseTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_relation_user_single_purchase';
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
				'USER_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('USER_SINGLE_PURCHASE_ENTITY_USER_ID_FIELD')
				]
			),
			new IntegerField(
				'SINGLE_PURCHASE_ID',
				[
					'primary' => true,
					'title' => Loc::getMessage('USER_SINGLE_PURCHASE_ENTITY_SINGLE_PURCHASE_ID_FIELD')
				]
			),
			'RELATION_USER_PURCHASE' => (new Reference(
				'RELATION_USER_PURCHASE',
				UserTable::class,
				Join::on('this.USER_ID', 'ref.ID')
			)) ->configureJoinType('inner'),

			'RELATION_PURCHASE' => (new Reference(
				'RELATION_PURCHASE',
				PurchaseTable::class,
				Join::on('this.SINGLE_PURCHASE_ID', 'ref.ID')
			)) ->configureJoinType('inner'),
		];
	}
}