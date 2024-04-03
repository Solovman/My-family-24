<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;

Loc::loadMessages(__FILE__);

/**
 * Class SubscriptionTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> LEVEL string(50) optional default 'Free'
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
			new StringField(
				'LEVEL',
				[
					'default' => 'Free',
					'validation' => [__CLASS__, 'validateLevel'],
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
			new IntegerField(
				'NUMBER_TREES',
				[
					'default' => 1,
					'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_NUMBER_TREES_FIELD')
				]
			),
		];
	}

	/**
	 * Returns validators for LEVEL field.
	 *
	 * @return array
	 */
	public static function validateLevel()
	{
		return [
			new LengthValidator(null, 50),
		];
	}
}