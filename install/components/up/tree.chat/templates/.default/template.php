<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */
\Bitrix\Main\UI\Extension::load('up.chat');
?>


<div class="my-container">
	<section class="section">
		<h1 class="title">Список чатов:</h1>
		<div class="container" id="chat-container"></div>
	</section>
</div>

<script>
	BX.ready(function ()
	{
		const chat = new BX.Up.Tree.Chat({
			rootNodeId : 'chat-container',
		});
	});
</script>