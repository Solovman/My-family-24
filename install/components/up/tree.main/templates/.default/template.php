<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.creationtree');

?>

<div class="my-container tree__container" style="height: 700px" id="tree">
	<div class="tree__spinner spinner-grow text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>

<style id="myStyles">
	@import url("https://fonts.googleapis.com/css?family=Gochi+Hand");
	.node {
		font-family: 'Gochi Hand';
	}
	.node.baby rect {
		fill: rgb(255, 202, 40);
	}
</style>

<script>
	BX.ready(function ()
	{
		const tree = new BX.Up.Tree.CreationTree({
			rootNodeId: 'tree',
		});
	});
</script>








