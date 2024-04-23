<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

CJSCore::Init(['popup']);
\Bitrix\Main\UI\Extension::load('up.search');
?>

<div class="search">
	<div id="trees-select"></div>
	<div class="search__area">
		<div id="search-area-user"></div>
		<button id="search-relatives" class="search__btn">Поиск</button>
	</div>
</div>


<script>
	BX.ready(function ()
	{
		let search = new BX.Up.Tree.Search({
			rootNodeId: 'trees-select',
			rootSearchId: 'search-area-user',
		});
	});
</script>