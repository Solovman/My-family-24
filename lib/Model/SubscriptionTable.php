<?php

declare(strict_types=1);

namespace Bitrix\Subscription;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\EnumField,
	Bitrix\Main\ORM\Fields\IntegerField;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\Rest\User;
use Bitrix\User\UserTable;

Loc::loadMessages(__FILE__);

/**
 * Class SubscriptionTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> LEVEL unknown optional default Free
 * <li> PRICE int optional default 0
 * <li> NUMBER_TREES int optional default 1
 * </ul>
 *
 * @package Bitrix\Subscription
 **/

class SubscriptionTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_subscription';
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
					'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_ID_FIELD')
				]
			),
			new EnumField(
			'LEVEL',
				[
				'default' => 'Free',
				'values' => ['Free', 'Standard', 'Premium'],
				'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_LEVEL_FIELD')
			]
			),
			new IntegerField(
				'PRICE',
				[
					'default' => 0,
					'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_PRICE_FIELD')
				]
			),

            'ID' => new OneToMany(
                'USER_SUBSCRIPTION',
                UserTable::class,
                'SUBSCRIPTION_ID'
            ),

			new IntegerField(
				'NUMBER_TREES',
				[
					'default' => 1,
					'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_NUMBER_TREES_FIELD')
				]
			),
		];
	}
}