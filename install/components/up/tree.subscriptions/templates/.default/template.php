<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.subscriptions');

CJSCore::Init(['popup']);

?>

<div class="subscriptions__container">
	<div class="subscriptions__container-btn">
		<button class="subscriptions__btn _active" data-tab="tab_1">Подписки</button>
		<button class="subscriptions__btn" data-tab="tab_2">Кастомизация</button>
	</div>
	<ul id="tab_1" class="subscriptions__list subscriptions__tabs-item _active"></ul>
	<?php
	$APPLICATION->IncludeComponent("up:tree.subscriptions", "single-purchase", []);
	?>
</div>

<script>
	BX.ready(function ()
	{
		let subscriptions = new BX.Up.Tree.Subscriptions({
			rootNodeId: 'tab_1',
		});
	});
</script>




