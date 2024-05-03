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
		<div id="search-area-user">
            <div class="notFound">
                <span class="notFound-icon">
                    <svg width="80px" height="80px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#00ceaa" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
                <p id="text-search" class="notFound-text"></p>
            </div>
        </div>
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