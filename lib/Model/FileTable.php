<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class FileTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> TIMESTAMP_X datetime optional
 * <li> MODULE_ID string(50) optional
 * <li> HEIGHT int optional
 * <li> WIDTH int optional
 * <li> FILE_SIZE int optional
 * <li> CONTENT_TYPE string(255) optional default 'IMAGE'
 * <li> SUBDIR string(255) optional
 * <li> FILE_NAME string(255) mandatory
 * <li> ORIGINAL_NAME string(255) optional
 * <li> DESCRIPTION string(255) optional
 * <li> HANDLER_ID string(50) optional
 * <li> EXTERNAL_ID string(50) optional
 * </ul>
 *
 * @package Bitrix\File
 **/

class FileTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'b_file';
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
					'title' => Loc::getMessage('FILE_ENTITY_ID_FIELD')
				]
			),
			new DatetimeField(
				'TIMESTAMP_X',
				[
					'title' => Loc::getMessage('FILE_ENTITY_TIMESTAMP_X_FIELD')
				]
			),
			new StringField(
				'MODULE_ID',
				[
					'validation' => [__CLASS__, 'validateModuleId'],
					'title' => Loc::getMessage('FILE_ENTITY_MODULE_ID_FIELD')
				]
			),
			new IntegerField(
				'HEIGHT',
				[
					'title' => Loc::getMessage('FILE_ENTITY_HEIGHT_FIELD')
				]
			),
			new IntegerField(
				'WIDTH',
				[
					'title' => Loc::getMessage('FILE_ENTITY_WIDTH_FIELD')
				]
			),
			new IntegerField(
				'FILE_SIZE',
				[
					'title' => Loc::getMessage('FILE_ENTITY_FILE_SIZE_FIELD')
				]
			),
			new StringField(
				'CONTENT_TYPE',
				[
					'default' => 'IMAGE',
					'validation' => [__CLASS__, 'validateContentType'],
					'title' => Loc::getMessage('FILE_ENTITY_CONTENT_TYPE_FIELD')
				]
			),
			new StringField(
				'SUBDIR',
				[
					'validation' => [__CLASS__, 'validateSubdir'],
					'title' => Loc::getMessage('FILE_ENTITY_SUBDIR_FIELD')
				]
			),
			new StringField(
				'FILE_NAME',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateFileName'],
					'title' => Loc::getMessage('FILE_ENTITY_FILE_NAME_FIELD')
				]
			),
			new StringField(
				'ORIGINAL_NAME',
				[
					'validation' => [__CLASS__, 'validateOriginalName'],
					'title' => Loc::getMessage('FILE_ENTITY_ORIGINAL_NAME_FIELD')
				]
			),
			new StringField(
				'DESCRIPTION',
				[
					'validation' => [__CLASS__, 'validateDescription'],
					'title' => Loc::getMessage('FILE_ENTITY_DESCRIPTION_FIELD')
				]
			),
			new StringField(
				'HANDLER_ID',
				[
					'validation' => [__CLASS__, 'validateHandlerId'],
					'title' => Loc::getMessage('FILE_ENTITY_HANDLER_ID_FIELD')
				]
			),
			new StringField(
				'EXTERNAL_ID',
				[
					'validation' => [__CLASS__, 'validateExternalId'],
					'title' => Loc::getMessage('FILE_ENTITY_EXTERNAL_ID_FIELD')
				]
			),
			'IMAGE_PERSON' => (new Reference(
				'IMAGE_PERSON',
				PersonTable::class,
				Join::on('this.ID', 'ref.IMAGE_ID')
			)) ->configureJoinType('inner'),
		];
	}

	/**
	 * Returns validators for MODULE_ID field.
	 *
	 * @return array
	 */
	public static function validateModuleId()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for CONTENT_TYPE field.
	 *
	 * @return array
	 */
	public static function validateContentType()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for SUBDIR field.
	 *
	 * @return array
	 */
	public static function validateSubdir()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for FILE_NAME field.
	 *
	 * @return array
	 */
	public static function validateFileName()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for ORIGINAL_NAME field.
	 *
	 * @return array
	 */
	public static function validateOriginalName()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for DESCRIPTION field.
	 *
	 * @return array
	 */
	public static function validateDescription()
	{
		return [
			new LengthValidator(null, 255),
		];
	}

	/**
	 * Returns validators for HANDLER_ID field.
	 *
	 * @return array
	 */
	public static function validateHandlerId()
	{
		return [
			new LengthValidator(null, 50),
		];
	}

	/**
	 * Returns validators for EXTERNAL_ID field.
	 *
	 * @return array
	 */
	public static function validateExternalId()
	{
		return [
			new LengthValidator(null, 50),
		];
	}
}