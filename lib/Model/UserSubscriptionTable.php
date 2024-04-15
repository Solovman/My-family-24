<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class UserSubscriptionTable
 *
 * Fields:
 * <ul>
 * <li> USER_ID int mandatory
 * <li> COUNT_TREES int optional default 0
 * <li> SUBSCRIPTION_ID int optional default 1
 * <li> SUBSCRIPTION_BUY_TIME datetime optional
 * </ul>
 *
 * @package Bitrix\Relation
 **/

class UserSubscriptionTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_relation_user_subscription';
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
					'title' => Loc::getMessage('USER_SUBSCRIPTION_ENTITY_USER_ID_FIELD')
				]
			),
			new IntegerField(
				'COUNT_TREES',
				[
					'default' => 0,
					'title' => Loc::getMessage('USER_SUBSCRIPTION_ENTITY_COUNT_TREES_FIELD')
				]
			),
			new IntegerField(
				'SUBSCRIPTION_ID',
				[
					'default' => 1,
					'title' => Loc::getMessage('USER_SUBSCRIPTION_ENTITY_SUBSCRIPTION_ID_FIELD')
				]
			),
			new DatetimeField(
				'SUBSCRIPTION_BUY_TIME',
				[
					'title' => Loc::getMessage('USER_SUBSCRIPTION_ENTITY_SUBSCRIPTION_BUY_TIME_FIELD')
				]
			),
			'RELATION_USER_SUBSCRIPTION' => (new Reference(
				'RELATION_USER_SUBSCRIPTION',
				UserTable::class,
				Join::on('this.USER_ID', 'ref.ID')
			)) ->configureJoinType('inner'),

			'RELATION_SUBSCRIPTION' => (new Reference(
				'RELATION_SUBSCRIPTION',
				SubscriptionTable::class,
				Join::on('this.SUBSCRIPTION_ID', 'ref.ID')
			)) ->configureJoinType('inner'),
		];
	}
}
