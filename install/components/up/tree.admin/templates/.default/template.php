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
		<button id="users" class="admin__btn"><?= GetMessage('UP_TREE_ADMIN_USERS') ?></button>
		<button id="sub" class="admin__btn"><?= GetMessage('UP_TREE_ADMIN_SUBSCRIPTIONS') ?></button>
		<button id="purchase" class="admin__btn"><?= GetMessage('UP_TREE_ADMIN_PURCHASES') ?></button>
		<button id="userSub" class="admin__btn"><?= GetMessage('UP_TREE_ADMIN_USER_SUBSCRIPTIONS') ?></button>
		<button id="userPurchase" class="admin__btn"><?= GetMessage('UP_TREE_ADMIN_USER_PURCHASES') ?></button>
	</div>
	<div class="container" id="table">
		<div class="admin__spinner spinner-grow text-primary" role="status">
			<span class="visually-hidden">Loading...</span>
		</div>
	</div>
	<div class="admin__btn-container">
		<button id="add" class="admin__btn-add"><?= GetMessage('UP_TREE_ADMIN_ADD_BUTTON') ?></button>
	</div>
</div>

<script>
	BX.ready(function ()
	{
		const admin = new BX.Up.Tree.Admin({
			rootNodeId: 'table',
		});
	});
	BX.message({
		UP_TREE_ADMIN_TITLE : '<?=GetMessageJS("UP_TREE_ADMIN_TITLE")?>',
		UP_TREE_ADMIN_PRICE : '<?=GetMessageJS("UP_TREE_ADMIN_PRICE")?>',
		UP_TREE_ADMIN_ACTIONS : '<?=GetMessageJS("UP_TREE_ADMIN_ACTIONS")?>',
		UP_TREE_ADMIN_NAME : '<?=GetMessageJS("UP_TREE_ADMIN_NAME")?>',
		UP_TREE_ADMIN_STATUS : '<?=GetMessageJS("UP_TREE_ADMIN_STATUS")?>',
		UP_TREE_ADMIN_SURNAME : '<?=GetMessageJS("UP_TREE_ADMIN_SURNAME")?>',
		UP_TREE_ADMIN_EMAIL : '<?=GetMessageJS("UP_TREE_ADMIN_EMAIL")?>',
		UP_TREE_ADMIN_CUSTOMIZATION : '<?=GetMessageJS("UP_TREE_ADMIN_CUSTOMIZATION")?>',
		UP_TREE_ADMIN_SUBSCRIPTION : '<?=GetMessageJS("UP_TREE_ADMIN_SUBSCRIPTION")?>',
		UP_TREE_ADMIN_NUMBER_NODES : '<?=GetMessageJS("UP_TREE_ADMIN_NUMBER_NODES")?>',
		UP_TREE_ADMIN_NUMBER_TREES : '<?=GetMessageJS("UP_TREE_ADMIN_NUMBER_TREES")?>',
		UP_TREE_ADMIN_USER_ID : '<?=GetMessageJS("UP_TREE_ADMIN_USER_ID")?>',
		UP_TREE_ADMIN_SUBSCRIPTION_ID : '<?=GetMessageJS("UP_TREE_ADMIN_SUBSCRIPTION_ID")?>',
		UP_TREE_ADMIN_PURCHASE_ID : '<?=GetMessageJS("UP_TREE_ADMIN_PURCHASE_ID")?>',
		UP_TREE_ADMIN_BUY_TIME : '<?=GetMessageJS("UP_TREE_ADMIN_BUY_TIME")?>',
		UP_TREE_ADMIN_PURCHASE_NAME : '<?=GetMessageJS("UP_TREE_ADMIN_PURCHASE_NAME")?>',
		UP_TREE_ADMIN_SUBSCRIPTION_NAME : '<?=GetMessageJS("UP_TREE_ADMIN_SUBSCRIPTION_NAME")?>',
		UP_TREE_ADMIN_ALLOW_CUSTOMIZATION : '<?=GetMessageJS("UP_TREE_ADMIN_ALLOW_CUSTOMIZATION")?>',
		UP_TREE_ADMIN_ALLOW_CUSTOMIZATION_YES : '<?=GetMessageJS("UP_TREE_ADMIN_ALLOW_CUSTOMIZATION_YES")?>',
		UP_TREE_ADMIN_ALLOW_CUSTOMIZATION_NO : '<?=GetMessageJS("UP_TREE_ADMIN_ALLOW_CUSTOMIZATION_NO")?>',

	});
</script>