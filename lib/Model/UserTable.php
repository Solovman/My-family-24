<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Subscription\SubscriptionTable;

Loc::loadMessages(__FILE__);

/**
 * Class UserTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> NAME string(50) mandatory
 * <li> EMAIL string(100) mandatory
 * <li> PASSWORD_HASH string(255) mandatory
 * <li> SUBSCRIPTION_ID int optional default 1
 * <li> SUBSCRIPTION_BUY_TIME datetime optional
 * </ul>
 *
 * @package Bitrix\User
 **/

class UserTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_user';
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
					'title' => Loc::getMessage('USER_ENTITY_ID_FIELD')
				]
			),
			new StringField(
				'NAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateName'],
					'title' => Loc::getMessage('USER_ENTITY_NAME_FIELD')
				]
			),
			new StringField(
				'EMAIL',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateEmail'],
					'title' => Loc::getMessage('USER_ENTITY_EMAIL_FIELD')
				]
			),
			new StringField(
				'PASSWORD_HASH',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validatePasswordHash'],
					'title' => Loc::getMessage('USER_ENTITY_PASSWORD_HASH_FIELD')
				]
			),
			new IntegerField(
				'SUBSCRIPTION_ID',
				[
					'default' => 1,
					'title' => Loc::getMessage('USER_ENTITY_SUBSCRIPTION_ID_FIELD')
				]
			),

			new DatetimeField(
				'SUBSCRIPTION_BUY_TIME',
				[
					'title' => Loc::getMessage('USER_ENTITY_SUBSCRIPTION_BUY_TIME_FIELD')
				]
			),
		];
	}

	/**
	 * Returns validators for NAME field.
	 *
	 * @return array
	 */
	public static function validateName()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for EMAIL field.
	 *
	 * @return array
	 */
	public static function validateEmail()
	{
		return [
			new LengthValidator(null, 100),
		];
	}

	/**
	 * Returns validators for PASSWORD_HASH field.
	 *
	 * @return array
	 */
	public static function validatePasswordHash()
	{
		return [
			new LengthValidator(null, 255),
		];
	}
}
