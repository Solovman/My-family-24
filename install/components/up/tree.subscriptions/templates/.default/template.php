<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.subscriptions');

?>

<div class="subscriptions__container">
	<ul class="subscriptions__list">
		<li class="subscriptions__item">
			<div class="nft ntf_1">
				<div class='main'>
					<h2 class="subscriptions__heading">Free</h2>
					<p class='description'>Our Kibertopiks will give you nothing, waste your money on us.</p>
					<div class='tokenInfo'>
						<div class="price">
							<ins>◘</ins>
							<p>0.031 ETH</p>
						</div>
						<div class="duration">
							<ins>◷</ins>
							<p>11 days left</p>
						</div>
					</div>
				</div>
				<button class="subscriptions__button">Купить</button>
			</div>
		</li>
		<li class="subscriptions__item">
			<div class="nft ntf_2">
				<div class='main'>
					<h2 class="subscriptions__heading">Standard</h2>
					<p class='description'>Our Kibertopiks will give you nothing, waste your money on us.</p>
					<div class='tokenInfo'>
						<div class="price">
							<ins>◘</ins>
							<p>0.031 ETH</p>
						</div>
						<div class="duration">
							<ins>◷</ins>
							<p>11 days left</p>
						</div>
					</div>
				</div>
				<button class="subscriptions__button">Купить</button>
			</div>
		</li>
		<li class="subscriptions__item">
			<div class="nft ntf_3">
				<div class='main'>
					<h2 class="subscriptions__heading">Premium</h2>
					<p class='description'>Our Kibertopiks will give you nothing, waste your money on us.</p>
					<div class='tokenInfo'>
						<div class="price">
							<ins>◘</ins>
							<p>0.031 ETH</p>
						</div>
						<div class="duration">
							<ins>◷</ins>
							<p>11 days left</p>
						</div>
					</div>
				</div>
				<button class="subscriptions__button">Купить</button>
			</div>
		</li>
	</ul>
</div>

<div id="bx_popup_form" style="display:none; padding:10px;min-height: 300px" class="bx_login_popup_form">
	<div class="sign-up-modal">
		<div id="close-modal-button"></div>
		<div class="logo-container">
			<svg class="logo" width="94.4px" height="56px">
				<g>
					<polygon points="49.3,56 49.3,0 0,28 	" />
					<path d="M53.7,3.6v46.3l40.7-23.2L53.7,3.6z M57.7,10.6l28.4,16.2L57.7,42.9V10.6z" />
				</g>
			</svg>
		</div>

		<form class="details">
			<div class="input-container">
				<input class="col-sm-12 email-input with-placeholder" id="email" type="email" placeholder="Email" />
			</div>
			<div class="input-container">
				<input class="col-sm-5 username-input with-placeholder" id="username" type="text" placeholder="Username" maxlength="8" />
			</div>
			<div class="input-container">
				<input class="col-sm-5 col-sm-push-2 password-input with-placeholder" id="password" type="password" placeholder="Password" />
			</div>

			<div class="col-sm-12 form-checkbox">
				<label>
					<input type="checkbox" value="true"> Keep me signed in</label>
			</div>

			<input id="sign-up-button" type="submit" value="Sign Up">

			<p>Already have an account? <a href="#signIn">Sign in</a></p>
		</form>
	</div>
</div>

<script>
	BX.ready(function ()
	{
		let subscriptions = new BX.Up.Tree.Subscriptions({

		});
	});
</script>




