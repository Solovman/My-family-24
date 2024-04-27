<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */
\Bitrix\Main\UI\Extension::load('up.chat');
?>


<div class="my-container">
	<div class="section">
		<h1 class="title">Список чатов:</h1>
		<div class="chat__container">
			<div class="discussions" id="chat-container"></div>
			<div class="chat">
				<div class="header-chat">
					<i class="icon fa fa-user-o" aria-hidden="true"></i>
					<p id="name-user" class="name"></p>
					<i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
				</div>
				<div id="messages" class="messages-chat"></div>
				<div class="footer-chat">
					<input id="input-message" type="text" class="write-message" placeholder="Type your message here">
					<div id="footer-send"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<script>
	BX.ready(function ()
	{
		const chat = new BX.Up.Tree.Chat({
			rootNodeId : 'chat-container',
			rootMessages: 'messages'
		});
	});
</script>