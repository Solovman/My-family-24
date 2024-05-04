<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

?>

<div class="content">
	<section class="main__container">
		<h1 class="main__heading">Family Tree</h1>
		<?php
		if (!empty($arParams["~AUTH_RESULT"]))
		{
			ShowMessage($arParams["~AUTH_RESULT"]);
		}

		if (!empty($arResult['ERROR_MESSAGE']))
		{

			global $APPLICATION;
			/** @global CMain $APPLICATION */
			global $APPLICATION;

			if(!is_array($arResult['ERROR_MESSAGE']))
				$arMess=Array("MESSAGE" => $arResult['ERROR_MESSAGE'], "TYPE" => "ERROR");

			if($arResult['ERROR_MESSAGE']["MESSAGE"] <> "")
			{
				$APPLICATION->IncludeComponent(
					"bitrix:system.show_message",
					".default",
					Array(
						"MESSAGE"=> $arResult['ERROR_MESSAGE']["MESSAGE"],
						"STYLE" => ($arResult['ERROR_MESSAGE']["TYPE"]=="OK"?"notetext":"errortext"),
					),
					null,
					array(
						"HIDE_ICONS" => "Y"
					)
				);
			}
		}
		?>
		<div class="main__tabs-nav">
			<a href="/" class="main__tabs-button main__tabs-button_login _active" data-tab="tab_1"><?= GetMessage('AUTH_AUTHORIZE') ?></a>
			<?php if($arParams["NOT_SHOW_LINKS"] != "Y" && $arResult["NEW_USER_REGISTRATION"] == "Y" && $arParams["AUTHORIZE_REGISTRATION"] != "Y"):?>
				<a class="main__tabs-button main__tabs-button_register" href="<?=$arResult["AUTH_REGISTER_URL"]?>" rel="nofollow"><?=GetMessage("AUTH_REGISTER")?></a><br/>
			<?php endif?>
		</div>
		<?php if($arResult["AUTH_SERVICES"]):?>
			<div class="bx-auth-title"><?= GetMessage("AUTH_TITLE")?></div>
		<?php endif?>

		<form class="main__form" name="form_auth" method="post" target="_top" action="<?=$arResult["AUTH_URL"]?>">
			<input type="hidden" name="AUTH_FORM" value="Y" />
			<input type="hidden" name="TYPE" value="AUTH" />
			<?php if ($arResult["BACKURL"] <> ''):?>
				<input type="hidden" name="backurl" value="<?=$arResult["BACKURL"]?>" />
			<?php endif?>
			<?php foreach ($arResult["POST"] as $key => $value):?>
				<input type="hidden" name="<?=$key?>" value="<?=$value?>" />
			<?php endforeach?>

			<table class="bx-auth-table">
				<tr>
					<td class="main__container-input">
						<label class="main__label-form" for="login"><?= GetMessage('AUTH_LOGIN') ?></label>
						<span class="main__icon-input">
							<svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
								<circle cx="512" cy="512" r="512" style="fill:#ff6068"/>
								<path d="m458.15 617.7 18.8-107.3a56.94 56.94 0 0 1 35.2-101.9V289.4h-145.2a56.33 56.33 0 0 0-56.3 56.3v275.8a33.94 33.94 0 0 0 3.4 15c12.2 24.6 60.2 103.7 197.9 164.5V622.1a313.29 313.29 0 0 1-53.8-4.4zM656.85 289h-144.9v119.1a56.86 56.86 0 0 1 35.7 101.4l18.8 107.8A320.58 320.58 0 0 1 512 622v178.6c137.5-60.5 185.7-139.9 197.9-164.5a33.94 33.94 0 0 0 3.4-15V345.5a56 56 0 0 0-16.4-40 56.76 56.76 0 0 0-40.05-16.5z" style="fill:#fff"/>
							</svg>
						</span>
						<input class="bx-auth-input form-control main__input-form" type="text" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_LOGIN') ?>" name="USER_LOGIN" maxlength="255" value="<?=$arResult["LAST_LOGIN"]?>" />
					</td>
				</tr>
				<tr>
					<td class="main__container-input">
						<label class="main__label-form" for="password"><?= GetMessage('AUTH_PASSWORD') ?></label>
						<span class="main__icon-input">
							<svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" id="icon" xmlns="http://www.w3.org/2000/svg">
								<defs>
									<style>
									  .cls-1 {
										  fill: none;
									  }
									</style>
								</defs>
							  <path fill="#ff6068" d="M21,2a8.9977,8.9977,0,0,0-8.6119,11.6118L2,24v6H8L18.3881,19.6118A9,9,0,1,0,21,2Zm0,16a7.0125,7.0125,0,0,1-2.0322-.3022L17.821,17.35l-.8472.8472-3.1811,3.1812L12.4141,20,11,21.4141l1.3787,1.3786-1.5859,1.586L9.4141,23,8,24.4141l1.3787,1.3786L7.1716,28H4V24.8284l9.8023-9.8023.8472-.8474-.3473-1.1467A7,7,0,1,1,21,18Z"/>
							  <circle fill="#ff6068" cx="22" cy="10" r="2"/>
							  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
							</svg>
						</span>
						<div class="password-container " style="display: flex; flex-direction: row; align-items: center">
							<input class="bx-auth-input form-control main__input-form" type="password" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_PASSWORD') ?>" name="USER_PASSWORD" maxlength="255" autocomplete="off" />
							<span class="show-password eye-icon" onclick="togglePasswordVisibility(this)">
								<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeClosedIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <path d="M20 9C20 9 19.6797 9.66735 19 10.5144M12 14C10.392 14 9.04786 13.5878 7.94861 13M12 14C13.608 14 14.9521 13.5878 16.0514 13M12 14V17.5M4 9C4 9 4.35367 9.73682 5.10628 10.6448M7.94861 13L5 16M7.94861 13C6.6892 12.3266 5.75124 11.4228 5.10628 10.6448M16.0514 13L18.5 16M16.0514 13C17.3818 12.2887 18.3535 11.3202 19 10.5144M5.10628 10.6448L2 12M19 10.5144L22 12"/> </svg>
							</span>
						</div>
						<script>
							function togglePasswordVisibility(element) {
								const passwordField = element.previousElementSibling;
								if (passwordField.type === "password") {
									passwordField.type = "text";
									element.innerHTML = '<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <path d="M22 12C22 12 19 18 12 18C5 18 2 12 2 12C2 12 5 6 12 6C19 6 22 12 22 12Z"/> <circle cx="12" cy="12" r="3"/> </svg>';
								} else {
									passwordField.type = "password";
									element.innerHTML = '<svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="eyeClosedIconTitle" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000000"> <path d="M20 9C20 9 19.6797 9.66735 19 10.5144M12 14C10.392 14 9.04786 13.5878 7.94861 13M12 14C13.608 14 14.9521 13.5878 16.0514 13M12 14V17.5M4 9C4 9 4.35367 9.73682 5.10628 10.6448M7.94861 13L5 16M7.94861 13C6.6892 12.3266 5.75124 11.4228 5.10628 10.6448M16.0514 13L18.5 16M16.0514 13C17.3818 12.2887 18.3535 11.3202 19 10.5144M5.10628 10.6448L2 12M19 10.5144L22 12"/> </svg>';
								}
							}
						</script>

						<?php if($arResult["SECURE_AUTH"]):?>
							<span class="bx-auth-secure" id="bx_auth_secure" title="<?= GetMessage("AUTH_SECURE_NOTE")?>" style="display:none">
					<div class="bx-auth-secure-icon"></div>
				</span>
							<noscript>
				<span class="bx-auth-secure" title="<?= GetMessage("AUTH_NONSECURE_NOTE")?>">
					<div class="bx-auth-secure-icon bx-auth-secure-unlock"></div>
				</span>
							</noscript>
							<script type="text/javascript">
								document.getElementById('bx_auth_secure').style.display = 'inline-block';
							</script>
						<?php endif?>
					</td>
				</tr>
				<tr>
					<td colspan="2" class="authorize-submit-cell"><input type="submit" class="btn btn-primary main__button-form" name="Login" value="<?=GetMessage("AUTH_AUTHORIZE")?>" /></td>
				</tr>
			</table>
		</form>
	</section>
</div>


<script type="text/javascript">
<?php if ($arResult["LAST_LOGIN"] <> ''):?>
try{document.form_auth.USER_PASSWORD.focus();}catch(e){}
<?php else:?>
try{document.form_auth.USER_LOGIN.focus();}catch(e){}
<?php endif?>
</script>

