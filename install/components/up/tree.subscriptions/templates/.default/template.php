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
		<button class="subscriptions__btn _active" data-tab="tab_1"><?= GetMessage('UP_TREE_SUBSCRIPTIONS_SUBSCRIPTION') ?></button>
		<button class="subscriptions__btn" data-tab="tab_2"><?= GetMessage('UP_TREE_SUBSCRIPTIONS_PURCHASE') ?></button>
	</div>
	<ul id="tab_1" class="subscriptions__list subscriptions__tabs-item _active">
		<div class="sub__spinner spinner-grow text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</ul>
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
	BX.message({
		UP_TREE_SUBSCRIPTIONS_STANDARD_PREMIUM : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_STANDARD_PREMIUM")?>',
		UP_TREE_SUBSCRIPTIONS_FREE : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_FREE")?>',
		UP_TREE_SUBSCRIPTIONS_NUMBER_NODES_FREE_STANDARD : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_NUMBER_NODES_FREE_STANDARD")?>',
		UP_TREE_SUBSCRIPTIONS_NUMBER_NODES_PREMIUM : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_NUMBER_NODES_PREMIUM")?>',
		UP_TREE_SUBSCRIPTIONS_NUMBER_TREES_FREE_STANDARD : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_NUMBER_TREES_FREE_STANDARD")?>',
		UP_TREE_SUBSCRIPTIONS_NUMBER_TREES_PREMIUM : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_NUMBER_TREES_PREMIUM")?>',
		UP_TREE_SUBSCRIPTIONS_BUY_BUTTON : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_BUY_BUTTON")?>',
		UP_TREE_SUBSCRIPTIONS_BUY_TEXT : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_BUY_TEXT")?>',
		UP_TREE_SUBSCRIPTIONS_CUSTOM_STATUS_NO : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_CUSTOM_STATUS_NO")?>',
		UP_TREE_SUBSCRIPTIONS_CUSTOM_STATUS_YES : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_CUSTOM_STATUS_YES")?>',
		UP_TREE_SUBSCRIPTIONS_PRICE : '<?=GetMessageJS("UP_TREE_SUBSCRIPTIONS_PRICE")?>',
	});
</script>