<?php

declare(strict_types=1);

namespace Up\Tree\Model;

use Bitrix\Main\Localization\Loc,
	Bitrix\Main\ORM\Data\DataManager,
	Bitrix\Main\ORM\Fields\IntegerField,
	Bitrix\Main\ORM\Fields\StringField,
	Bitrix\Main\ORM\Fields\Validators\LengthValidator;
use Bitrix\Main\ORM\Fields\Relations\OneToMany;

Loc::loadMessages(__FILE__);

/**
 * Class PurchaseTable
 *
 * Fields:
 * <ul>
 * <li> ID int mandatory
 * <li> TITLE string(100) mandatory
 * <li> PRICE int optional
 * </ul>
 *
 * @package Bitrix\Single
 **/

class PurchaseTable extends DataManager
{
	/**
	 * Returns DB table name for entity.
	 *
	 * @return string
	 */
	public static function getTableName()
	{
		return 'up_single_purchase';
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
					'title' => Loc::getMessage('PURCHASE_ENTITY_ID_FIELD')
				]
			),
			new StringField(
				'TITLE',
				[
					'required' => true,
					'validation' => [__CLASS__, 'validateTitle'],
					'title' => Loc::getMessage('PURCHASE_ENTITY_TITLE_FIELD')
				]
			),
			new IntegerField(
				'PRICE',
				[
					'title' => Loc::getMessage('PURCHASE_ENTITY_PRICE_FIELD')
				]
			),
			'RELATION_USER_PURCHASE' => (new OneToMany('RELATION_USER_PURCHASE', UserSinglePurchaseTable::class, 'RELATION_PURCHASE'))->configureJoinType('inner'),
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