<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */

\Bitrix\Main\UI\Extension::load('up.tree-list');

CJSCore::Init(['popup', 'date']);

$this->IncludeLangFile("template.php");
?>
<div class="tree-list-container">
	<form action="/" method="post" class="form my-container create-tree-form">
		<div class="columns mb-6">
			<div class="column">
				<div class="field">
					<div class="control" style="position: relative">
						<div id="warningMessage" style="color: #ff6068; position: absolute; bottom: 100%; left: 0; font-size: 1.5em"></div>
						<input class="input input-title-tree" type="text" placeholder="<?= GetMessage('UP_TREE_LIST_ENTER_TITLE') ?>" id="treeTitleInput" name="treeTitle" style="font-size: 1.5em" required>
					</div>
				</div>
			</div>
			<div class="column">
				<button type="button" class="button is-success is-rounded button-add-tree" id="addTreeButton" style="font-size: 1.5em"><?= GetMessage('UP_TREE_LIST_CREATE_BUTTON') ?></button>
			</div>
		</div>
	</form>
	<div class="tree-list-app" id="tree-list"></div>
</div>


<?php
$APPLICATION->IncludeComponent("up:tree.modalLimit", "", []);
?>

<script>
	BX.ready(function ()
	{
		window.TreeList = new BX.Up.Tree.TreeList({
			rootNodeId : 'tree-list',
		});
	});
	BX.message({
		UP_TREE_LIST_CREATED_AT : '<?=GetMessageJS("UP_TREE_LIST_CREATED_AT")?>',
		UP_TREE_LIST_DELETE_TREE : '<?=GetMessageJS("UP_TREE_LIST_DELETE_TREE")?>',
		UP_TREE_LIST_USER_AGREEMENT : '<?=GetMessageJS("UP_TREE_LIST_USER_AGREEMENT")?>',
		UP_TREE_LIST_USER_AGREEMENT_CONTENT : '<?=GetMessageJS("UP_TREE_LIST_USER_AGREEMENT_CONTENT")?>',
		UP_TREE_LIST_USER_AGREEMENT_CHECKBOX : '<?=GetMessageJS("UP_TREE_LIST_USER_AGREEMENT_CHECKBOX")?>',
	});
</script>
