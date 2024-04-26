<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */

\Bitrix\Main\UI\Extension::load('up.messages');
?>

<div class="my-container">
	<section class="section">

		<div class="container" id="chat-container"></div>

		<form id="formSend">
			<div class="field">
				<div class="control">
					<textarea id ="message" class="textarea" placeholder="Type your message"></textarea>
				</div>
			</div>
			<div class="field">
				<div class="control">
					<button id="send" class="button is-primary">Send</button>
				</div>
			</div>
		</form>
	</section>
</div>

<script>
	BX.ready(function ()
	{
		const messages = new BX.Up.Tree.Messages({
			rootNodeId : 'chat-container',
		});
	});
</script>
