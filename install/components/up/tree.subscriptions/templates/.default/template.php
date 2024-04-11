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
				<button id="free" class="subscriptions__button">Купить</button>
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
				<button id="standard" class="subscriptions__button">Купить</button>
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
				<button id="premium" class="subscriptions__button">Купить</button>
			</div>
		</li>
	</ul>
</div>

<div id="bx_popup_form" style="display:none; padding:10px;min-height: 300px" class="bx_login_popup_form">
	<div class="sign-up-modal">
<!--		<div id="close-modal-button"></div>-->
		<div class="logo-container">
			<svg height="60px" width="60px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
				 viewBox="0 0 512 512"  xml:space="preserve">
				<style type="text/css">
					.st0{fill:#ffffff;}
				</style>
					<g>
						<path class="st0" d="M362.52,283.124c13.229,0.369,55.903-5.18,86.724-23.296c-61.625-29.739-119.02-104.774-119.02-104.774
						s30.673,4.197,69.838-16.82c-73.28-28.017-144.054-126.775-144.054-126.775s-70.772,98.758-144.07,126.775
						c39.181,21.017,69.854,16.82,69.854,16.82s-57.411,75.034-119.02,104.774c30.805,18.115,73.494,23.664,86.724,23.296
						C124.283,308.781,65.166,357.995,0,385.225c37.854,23.321,117.79,44.731,199.727,51.92l6.984,63.395h98.594l6.984-63.395
						c81.937-7.189,161.857-28.599,199.711-51.92C446.85,357.995,387.717,308.781,362.52,283.124z"/>
					</g>
				</svg>
		</div>

		<form class="details">
			<div class="input-container">
				<input id="phone" type="tel" placeholder="Phone" />
			</div>
			<div class="input-container">
				<input id="card" type="text" placeholder="Card number" maxlength="8" />
			</div>
			<div class="input-container input-info-card">
				<input class="input-info" id="month" type="text" placeholder="Month" maxlength="8" />
				<input class="input-info" id="year" type="text" placeholder="Year" maxlength="8" />
				<input class="input-info" id="cvc" type="text" placeholder="CVC" maxlength="8" />
			</div>
			<input id="sign-up-button" type="submit" value="Купить">
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




