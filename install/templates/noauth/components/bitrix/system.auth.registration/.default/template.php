<?php
/**
 * Bitrix vars
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 * @var CBitrixComponentTemplate $this
 */

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

?>

<?php if(!$arResult["SHOW_EMAIL_SENT_CONFIRMATION"]):?>

<div class="content">
	<section class="main__container">
		<h1 class="main__heading">Family Tree</h1>
		<div class="bx-auth container">

			<?php
			if (!empty($arParams["~AUTH_RESULT"]))
			{
				ShowMessage($arParams["~AUTH_RESULT"]);
			}
			?>

			<noindex>

				<div class="errortext" id="bx_register_error" style="display:none"><?php ShowError("error")?></div>

				<div id="bx_register_resend"></div>
				<div class="main__tabs-nav">
					<a class="main__tabs-button main__tabs-button_login" href="/" data-tab="tab_1"><?= GetMessage('AUTH_AUTHORIZE') ?></a>
					<a class="main__tabs-button main__tabs-button_register _active" href="<?=$arResult["AUTH_URL"]?>" rel="nofollow"><?=GetMessage("AUTH_REGISTER")?></a><br/>
				</div>
				<form id="tab_2" class="main__form main__tabs-item" method="post" action="<?=$arResult["AUTH_URL"]?>" name="bform" enctype="multipart/form-data">
					<input type="hidden" name="AUTH_FORM" value="Y" />
					<input type="hidden" name="TYPE" value="REGISTRATION" />

					<table class="data-table bx-registration-table">
						<tbody>
						<tr>
							<td class="main__title-input"><?=GetMessage("AUTH_NAME")?></td>
							<td class="main__container-input">
								<span class="main__icon-input-reg">
									<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="12" cy="6" r="4" stroke="#ff6068" stroke-width="1.5"/>
										<path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="#ff6068" stroke-width="1.5"/>
									</svg>
								</span>
								<input placeholder="<?= GetMessage('REGISTER_PLACEHOLDER_NANE') ?>" type="text" name="USER_NAME" maxlength="50" value="<?=$arResult["USER_NAME"]?>" class="bx-auth-input main__input-form-reg" />
							</td>
						</tr>
						<tr>
							<td class="main__title-input"><?=GetMessage("AUTH_LAST_NAME")?></td>
							<td class="main__container-input">
								<span class="main__icon-input-reg">
									<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="12" cy="6" r="4" stroke="#ff6068" stroke-width="1.5"/>
										<path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="#ff6068" stroke-width="1.5"/>
									</svg>
								</span>
								<input type="text" placeholder="<?= GetMessage('REGISTER_PLACEHOLDER_SURNAME') ?>" name="USER_LAST_NAME" maxlength="50" value="<?=$arResult["USER_LAST_NAME"]?>" class="bx-auth-input main__input-form-reg" />
							</td>
						</tr>
						<?php if($arResult["EMAIL_REGISTRATION"]):?>
							<tr>
								<td class="main__title-input"><?php if($arResult["EMAIL_REQUIRED"]):?><span class="starrequired">*</span><?php endif?><?=GetMessage("AUTH_EMAIL")?></td>
								<td class="main__container-input">
									<span class="main__icon-input-reg">
										<svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
											<circle cx="512" cy="512" r="512" style="fill:#ff6068"/>
											<path d="m458.15 617.7 18.8-107.3a56.94 56.94 0 0 1 35.2-101.9V289.4h-145.2a56.33 56.33 0 0 0-56.3 56.3v275.8a33.94 33.94 0 0 0 3.4 15c12.2 24.6 60.2 103.7 197.9 164.5V622.1a313.29 313.29 0 0 1-53.8-4.4zM656.85 289h-144.9v119.1a56.86 56.86 0 0 1 35.7 101.4l18.8 107.8A320.58 320.58 0 0 1 512 622v178.6c137.5-60.5 185.7-139.9 197.9-164.5a33.94 33.94 0 0 0 3.4-15V345.5a56 56 0 0 0-16.4-40 56.76 56.76 0 0 0-40.05-16.5z" style="fill:#fff"/>
										</svg>
									</span>
									<input class="bx-auth-input main__input-form-reg" placeholder="<?= GetMessage('REGISTER_PLACEHOLDER_EMAIL') ?>" type="text" name="USER_EMAIL" maxlength="255" value="<?=$arResult["USER_EMAIL"]?>" class="bx-auth-input" />
								</td>
							</tr>
						<?php endif?>
						<tr>
							<td class="main__title-input"><span class="starrequired">*</span><?=GetMessage("AUTH_PASSWORD_REQ")?></td>
							<td class="main__container-input">
								<span class="main__icon-input-reg">
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
								<input type="password" name="USER_PASSWORD" placeholder="<?= GetMessage('REGISTER_PLACEHOLDER_PASSWORD') ?>" maxlength="255" value="<?=$arResult["USER_PASSWORD"]?>" class="bx-auth-input main__input-form-reg" autocomplete="off" />
							</td>
						</tr>
						<tr>
							<input type="hidden" name="USER_CONFIRM_PASSWORD" maxlength="255" value="<?=$arResult["USER_CONFIRM_PASSWORD"]?>" class="bx-auth-input main__input-form-reg" autocomplete="off" />
						</tr>
						</tbody>
						<tfoot>
						<tr>
							<td colspan="2">
								<input class="main__button-form" type="submit" name="Register" value="<?=GetMessage("AUTH_REGISTER_ON")?>" />
							</td>
						</tr>
						</tfoot>
					</table>
				</form>
	</section>
</div>

<?php endif?>
</noindex>
</div>