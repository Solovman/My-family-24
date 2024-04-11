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

<script>
	BX.ready(function ()
	{
		const tree = new BX.Up.Tree.CreationTree({
			rootNodeId: 'tree',
		});
	});
</script>








