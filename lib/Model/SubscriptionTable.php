<?php

namespace Up\Tree\Model;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\Localization\Loc, Bitrix\Main\ORM\Data\DataManager, Bitrix\Main\ORM\Fields\DateField, Bitrix\Main\ORM\Fields\IntegerField, Bitrix\Main\ORM\Fields\StringField, Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Up\Tree\Model\UserSubscriptionTable;

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
 * <li> NUMBER_NODES int optional default 20
 * <li> CUSTOMIZATION int optional default 0
 * <li> SUBSCRIPTION_TYPE string(50) optional
 * <li> START_DATE date optional
 * <li> END_DATE date optional
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
	 * @throws ArgumentException
	 */
	public static function getMap()
	{
		return [
			new IntegerField(
				'ID', [
						'primary' => true,
						'autocomplete' => true,
						'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_ID_FIELD')
					]
			),
			new StringField(
				'LEVEL', [
						   'default' => 'Free',
						   'validation' => [__CLASS__, 'validateLevel'],
						   'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_LEVEL_FIELD')
					   ]
			),
			new IntegerField(
				'PRICE', [
						   'default' => 0,
						   'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_PRICE_FIELD')
					   ]
			),
			new IntegerField(
				'NUMBER_TREES', [
								  'default' => 1,
								  'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_NUMBER_TREES_FIELD')
							  ]
			),
			new IntegerField(
				'NUMBER_NODES', [
								  'default' => 20,
								  'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_NUMBER_NODES_FIELD')
							  ]
			),
			new IntegerField(
				'CUSTOMIZATION', [
								   'default' => 0,
								   'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_CUSTOMIZATION_FIELD')
							   ]
			),
			new StringField(
				'SUBSCRIPTION_TYPE', [
									   'validation' => [__CLASS__, 'validateSubscriptionType'],
									   'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_SUBSCRIPTION_TYPE_FIELD')
								   ]
			),
			new DateField(
				'START_DATE', [
								'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_START_DATE_FIELD')
							]
			),
			new DateField(
				'END_DATE', [
							  'title' => Loc::getMessage('SUBSCRIPTION_ENTITY_END_DATE_FIELD')
						  ]
			),

			'RELATION_SUBSCRIPTION_USER' => (new OneToMany('RELATION_SUBSCRIPTION_USER', UserSubscriptionTable::class, 'RELATION_SUBSCRIPTION'))->configureJoinType('inner'),
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

	/**
	 * Returns validators for SUBSCRIPTION_TYPE field.
	 *
	 * @return array
	 */
	public static function validateSubscriptionType()
	{
		return [
			new LengthValidator(null, 50),
		];
	}
}