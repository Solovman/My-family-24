<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */
?>
<div class="section">
	<div class="container chat-container" style="max-width: 50%;">
		<div class="message-info is-flex is-flex-direction-column is-align-items-start">
			<div class="message-header" style="background-color: #00ceaa; width: 25%;">
				<p><strong>User 1:</strong></p>
				<p>12:05 PM</p>
			</div>
			<div class="message-body" style="background-color: #f1f1f1; width: 25%;;">
				Hi bro!
			</div>
		</div>
		<div class="message-info is-flex is-flex-direction-column is-align-items-end">
			<div class="message-header" style="background-color: #00ceaa; width: 25%;">
				<p><strong>User 2:</strong></p>
				<p>12:07 PM</p>
			</div>
			<div class="message-body " style="background-color: #DCF8C6; width: 25%;">
				Hi bro!
			</div>
		</div>
		<div class="field">
			<div class="control">
				<textarea class="textarea" placeholder="Type your message"></textarea>
			</div>
		</div>
		<div class="field">
			<div class="control">
				<button class="button is-primary">Send</button>
			</div>
		</div>
	</div>
</div>
