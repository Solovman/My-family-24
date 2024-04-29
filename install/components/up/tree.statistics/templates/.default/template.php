<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */


\Bitrix\Main\UI\Extension::load('up.statistics');
?>

<div class="my-container">
	<div id="trees-select"></div>
	<div id="statistics"></div>
</div>



<script type="module">
	BX.ready(function ()
	{
		let statistics = new BX.Up.Tree.Statistics({
			rootNodeId: 'statistics',
			rootSelectId: 'trees-select',
		});
	});
</script>