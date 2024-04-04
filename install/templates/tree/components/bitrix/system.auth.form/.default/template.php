<?php

if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/**
 * @var array $arResult
 */

CJSCore::Init();

?>

<div class="bx-system-auth-form container">

<?php
if ($arResult['SHOW_ERRORS'] === 'Y' && $arResult['ERROR'] && !empty($arResult['ERROR_MESSAGE']))
{
	ShowMessage($arResult['ERROR_MESSAGE']);
}
?>

<?php if($arResult["FORM_TYPE"] == "login"):?>

<form id="tab_1" class="main__form main__tabs-item _active" name="system_auth_form<?=$arResult["RND"]?>" method="post" target="_top" action="<?=$arResult["AUTH_URL"]?>">
		<?php if($arResult["BACKURL"] <> ''):?>
			<input type="hidden" name="backurl" value="<?=$arResult["BACKURL"]?>" />
		<?php endif?>
		<?php foreach ($arResult["POST"] as $key => $value):?>
			<input type="hidden" name="<?=$key?>" value="<?=$value?>" />
		<?php endforeach?>
		<input type="hidden" name="AUTH_FORM" value="Y" />
		<input type="hidden" name="TYPE" value="AUTH" />
		<table width="95%">
			<tr>
				<td colspan="2">
					<div class="main__container-input">
						<label class="main__label-form" for="login"><?= GetMessage('AUTH_LOGIN') ?></label>
						<span class="main__icon-input">
							<svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
								<circle cx="512" cy="512" r="512" style="fill:#37a969"/>
								<path d="m458.15 617.7 18.8-107.3a56.94 56.94 0 0 1 35.2-101.9V289.4h-145.2a56.33 56.33 0 0 0-56.3 56.3v275.8a33.94 33.94 0 0 0 3.4 15c12.2 24.6 60.2 103.7 197.9 164.5V622.1a313.29 313.29 0 0 1-53.8-4.4zM656.85 289h-144.9v119.1a56.86 56.86 0 0 1 35.7 101.4l18.8 107.8A320.58 320.58 0 0 1 512 622v178.6c137.5-60.5 185.7-139.9 197.9-164.5a33.94 33.94 0 0 0 3.4-15V345.5a56 56 0 0 0-16.4-40 56.76 56.76 0 0 0-40.05-16.5z" style="fill:#fff"/>
							</svg>
						</span>
						<input id="login" class="main__input-form" type="text" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_EMAIL') ?>" name="USER_LOGIN" maxlength="50" value="" size="17" />
					</div>
					<script>
						BX.ready(function() {
							var loginCookie = BX.getCookie("<?=CUtil::JSEscape($arResult["~LOGIN_COOKIE_NAME"])?>");
							if (loginCookie)
							{
								var form = document.forms["system_auth_form<?=$arResult["RND"]?>"];
								var loginInput = form.elements["USER_LOGIN"];
								loginInput.value = loginCookie;
							}
						});
					</script>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<div class="main__container-input">
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
							  <path fill="#37a969" d="M21,2a8.9977,8.9977,0,0,0-8.6119,11.6118L2,24v6H8L18.3881,19.6118A9,9,0,1,0,21,2Zm0,16a7.0125,7.0125,0,0,1-2.0322-.3022L17.821,17.35l-.8472.8472-3.1811,3.1812L12.4141,20,11,21.4141l1.3787,1.3786-1.5859,1.586L9.4141,23,8,24.4141l1.3787,1.3786L7.1716,28H4V24.8284l9.8023-9.8023.8472-.8474-.3473-1.1467A7,7,0,1,1,21,18Z"/>
							  <circle fill="#37a969" cx="22" cy="10" r="2"/>
							  <rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/>
							</svg>
						</span>
						<input id="password" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_PASSWORD') ?>" type="password" name="USER_PASSWORD" maxlength="255" size="17" autocomplete="off" />
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<input class="main__button-form" type="submit" name="Login" value="<?=GetMessage("AUTH_LOGIN_BUTTON")?>" />
				</td>
			</tr>
	</table>
</form>
<?php endif?>
</div>
