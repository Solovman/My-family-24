<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\EnumField,
	Bitrix\Main\ORM\Fields\DateField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;

Loc::loadMessages(__FILE__);

/**
 * Class PersonTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> IMAGE_ID int mandatory
 * <li> NAME string(50) mandatory
 * <li> SURNAME string(50) mandatory
 * <li> BIRTH_DATE date optional
 * <li> DEATH_DATE date optional
 * <li> GENDER unknown optional
 * <li> TREE_ID int mandatory
 * </ul>
 *
 * @package Bitrix\Person
 **/

class PersonTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_person';
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
					'title' => Loc::getMessage('PERSON_ENTITY_ID_FIELD')
				]
			),
			new IntegerField(
				'IMAGE_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('PERSON_ENTITY_IMAGE_ID_FIELD')
				]
			),
			new StringField(
				'NAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateName'],
					'title' => Loc::getMessage('PERSON_ENTITY_NAME_FIELD')
				]
			),
			new StringField(
				'SURNAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateSurname'],
					'title' => Loc::getMessage('PERSON_ENTITY_SURNAME_FIELD')
				]
			),
			new DateField(
				'BIRTH_DATE',
				[
					'title' => Loc::getMessage('PERSON_ENTITY_BIRTH_DATE_FIELD')
				]
			),
			new DateField(
				'DEATH_DATE',
				[
					'title' => Loc::getMessage('PERSON_ENTITY_DEATH_DATE_FIELD')
				]
			),
			new EnumField(
				'GENDER',
				[
					'title' => Loc::getMessage('PERSON_ENTITY_GENDER_FIELD'),
					'values' => ['Male', 'Female']
				]
			),
			new IntegerField(
				'TREE_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('PERSON_ENTITY_TREE_ID_FIELD')
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
	 * Returns validators for SURNAME field.
	 *
	 * @return array
	 */
	public static function validateSurname()
	{
		return [
			new LengthValidator(null, 50),
		];
	}
}