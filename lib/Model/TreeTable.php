<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\DatetimeField,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator,
	Bitrix\Main\Type\DateTime;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;
use Bitrix\Main\ORM\Fields\Relations\Reference;
use Bitrix\Main\ORM\Query\Join;

Loc::loadMessages(__FILE__);

/**
 * Class TreeTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> TITLE string(100) mandatory
 * <li> USER_ID int mandatory
 * <li> CREATED_AT datetime optional default current datetime
 * </ul>
 *
 * @package Bitrix\Family
 **/

class TreeTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_family_tree';
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
					'title' => Loc::getMessage('TREE_ENTITY_ID_FIELD')
				]
			),
			new StringField(
				'TITLE',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateTitle'],
					'title' => Loc::getMessage('TREE_ENTITY_TITLE_FIELD')
				]
			),
			new IntegerField(
				'USER_ID',
				[
					'required' => true,
					'title' => Loc::getMessage('TREE_ENTITY_USER_ID_FIELD')
				]
			),
			new DatetimeField(
				'CREATED_AT',
				[
					'default' => function()
					{
						return new DateTime();
					},
					'title' => Loc::getMessage('TREE_ENTITY_CREATED_AT_FIELD')
				]
			),
			new StringField(
				'COLOR',
				[
					'title' => Loc::getMessage('TREE_ENTITY_COLOR_FIELD')
				]
			),
			'TREE_PERSON' => (new OneToMany('TREE_PERSON', PersonTable::class, 'PERSON_TREE'))->configureJoinType('inner'),

			'TREE_USER' => (new Reference(
				'TREE_USER',
				UserTable::class,
				Join::on('this.USER_ID', 'ref.ID')
			)) ->configureJoinType('inner'),
		];
	}

	/**
	 * Returns validators for TITLE field.
	 *
	 * @return array
	 */
	public static function validateTitle()
	{
		return [
			new LengthValidator(null, 100),
		];
	}
}