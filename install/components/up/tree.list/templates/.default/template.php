<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */

\Bitrix\Main\UI\Extension::load('up.tree-list');
?>

<form action="/" method="post" class="form my-container create-tree-form">
	<div class="columns mb-6">
		<div class="column">
			<div class="field">
				<div class="control" style="position: relative">
					<div id="warningMessage" style="color: #ff6068; position: absolute; bottom: 100%; left: 0; font-size: 1.5em"></div>
					<input class="input input-title-tree" type="text" placeholder="Enter a tree title" id="treeTitleInput" name="treeTitle" style="font-size: 1.5em" required>
				</div>
			</div>
		</div>
		<div class="column">
			<button type="button" class="button is-success is-rounded button-add-tree" id="addTreeButton" style="font-size: 1.5em">Create new tree!</button>
		</div>
	</div>
</form>
<div class="tree-list-app" id="tree-list"></div>


<script>
	BX.ready(function ()
	{
		window.TreeList = new BX.Up.Tree.TreeList({
			rootNodeId : 'tree-list',
		});
	});
</script>
