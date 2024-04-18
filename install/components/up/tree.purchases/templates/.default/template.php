<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.purchases');

?>

<div>
	<ul id="purchases-list"></ul>
</div>

<script>
	BX.ready(function ()
	{
		let purchases = new BX.Up.Tree.Purchases({
			rootNodeId: 'purchases-list',
		});
	});
</script>
