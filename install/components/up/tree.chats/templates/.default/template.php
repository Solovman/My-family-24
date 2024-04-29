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
		<div class="chat__container">
			<div class="discussions" id="chat-container"></div>
			<div class="chat">
				<div class="header-chat">
					<i class="icon fa fa-user-o" aria-hidden="true"></i>
					<p id="name-user" class="name"></p>
					<i class="icon clickable fa fa-ellipsis-h right" aria-hidden="true"></i>
				</div>
				<div id="messages" class="messages-chat">
					<div class="choice-chat">
						<h2 class="choice-chat-heading"><?= GetMessage('UP_TREE_CHATS_SELECT_CHAT') ?></h2>
					</div>
				</div>
				<form id="form-send" class="footer-chat">
					<input id="input-message" type="text" class="write-message" placeholder="<?= GetMessage('UP_TREE_CHATS_MESSAGE_PLACEHOLDER') ?>">
					<div id="footer-send"></div>
				</form>
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
	BX.message({
		UP_TREE_CHATS_HELPER_JAN : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_JAN")?>',
		UP_TREE_CHATS_HELPER_FEB : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_FEB")?>',
		UP_TREE_CHATS_HELPER_MAR : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_MAR")?>',
		UP_TREE_CHATS_HELPER_APR : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_APR")?>',
		UP_TREE_CHATS_HELPER_MAY : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_MAY")?>',
		UP_TREE_CHATS_HELPER_JUN : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_JUN")?>',
		UP_TREE_CHATS_HELPER_JUL : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_JUL")?>',
		UP_TREE_CHATS_HELPER_AUG : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_AUG")?>',
		UP_TREE_CHATS_HELPER_SEP : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_SEP")?>',
		UP_TREE_CHATS_HELPER_OCT : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_OCT")?>',
		UP_TREE_CHATS_HELPER_NOV : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_NOV")?>',
		UP_TREE_CHATS_HELPER_DEC : '<?=GetMessageJS("UP_TREE_CHATS_HELPER_DEC")?>'
	});
</script>