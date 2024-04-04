<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.creationtree');
?>

<div style="width:80%; height:500px;" id="tree"></div>

<script>
	const tree = new BX.Up.Tree.CreationTree();

	tree.render();
</script>




