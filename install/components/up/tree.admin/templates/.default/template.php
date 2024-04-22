<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */
\Bitrix\Main\UI\Extension::load('up.admin');

?>


<div class="admin my-container">
	<div class="admin__btn-container">
		<button id="sub" class="admin__btn">Подписки</button>
		<button id="purchase" class="admin__btn">Одноразовые покупки</button>
		<button id="userSub" class="admin__btn">Подписки пользователей</button>
		<button id="userPurchase" class="admin__btn">Одноразовые покупки пользователей</button>
	</div>
	<div class="container" id="table"></div>
	<div class="admin__btn-container">
		<button id="add" class="admin__btn-add">Добавить</button>
	</div>
</div>

<script>
	BX.ready(function ()
	{
		const admin = new BX.Up.Tree.Admin({
			rootNodeId: 'table',
		});
	});
</script>