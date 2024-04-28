<?

/**
 * @global CMain $APPLICATION
 * @var array $arParams
 * @var array $arResult
 */
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true)
{
	die();
}

if ($arResult["SHOW_SMS_FIELD"] == true)
{
	CJSCore::Init('phone_auth');
}

\Bitrix\Main\UI\Extension::load('up.account');

$APPLICATION->setAdditionalCSS('style.css');
?>

<div class="bx-auth-profile container">

	<div class="container">
		<div class="profile">
			<div id="data-profile"></div>

		</div>
	</div>

	<script>
		BX.ready(function ()
		{
			const account = new BX.Up.Tree.Account({
				rootNodeId: 'data-profile',
			});
		});
	</script>
	<? ShowError($arResult["strProfileError"]); ?>
	<?//
	// if ($arResult['DATA_SAVED'] == 'Y')
	// {
	// 	ShowNote(GetMessage('PROFILE_DATA_SAVED'));
	// }
	// ?>

	<?php if ($arResult["SHOW_SMS_FIELD"] == true): ?>

		<form method="post" action="<?= $arResult["FORM_TARGET"] ?>">
			<?= $arResult["BX_SESSION_CHECK"] ?>
			<input type="hidden" name="lang" value="<?= LANG ?>"/>
			<input type="hidden" name="ID" value=<?= $arResult["ID"] ?>/>
			<input type="hidden" name="SIGNED_DATA" value="<?= htmlspecialcharsbx($arResult["SIGNED_DATA"]) ?>"/>
			<table class="profile-table data-table">
				<tbody>
				<tr>
					<td>
						<?php echo GetMessage("main_profile_code") ?><span class="starrequired">*</span></td>
					<td><input size="30" type="text" name="SMS_CODE" value="<?= htmlspecialcharsbx(
							$arResult["SMS_CODE"]
						) ?>" autocomplete="off"/></td>
				</tr>
				</tbody>
			</table>

			<p><input type="submit" name="code_submit_button" value="<?
				echo GetMessage("main_profile_send") ?>"/></p>

		</form>

		<script>
			new BX.PhoneAuth({
				containerId: 'bx_profile_resend',
				errorContainerId: 'bx_profile_error',
				interval: <?=$arResult["PHONE_CODE_RESEND_INTERVAL"]?>,
				data:
					<?=CUtil::PhpToJSObject([
												'signedData' => $arResult["SIGNED_DATA"],
											])?>,
				onError:
					function(response) {
						var errorDiv = BX('bx_profile_error');
						var errorNode = BX.findChildByClassName(errorDiv, 'errortext');
						errorNode.innerHTML = '';
						for (var i = 0; i < response.errors.length; i++)
						{
							errorNode.innerHTML = errorNode.innerHTML + BX.util.htmlspecialchars(response.errors[i].message) + '<br>';
						}
						errorDiv.style.display = '';
					},
			});
		</script>

		<div id="bx_profile_error" style="display:none"><?
			ShowError("error") ?></div>

		<div id="bx_profile_resend"></div>

	<?
	else: ?>

		<script type="text/javascript">
			<!--
			var opened_sections = [<?
				$arResult["opened"] = $_COOKIE[$arResult["COOKIE_PREFIX"] . "_user_profile_open"];
				$arResult["opened"] = preg_replace("/[^a-z0-9_,]/i", "", $arResult["opened"]);
				if ($arResult["opened"] <> '')
				{
					echo "'" . implode("', '", explode(",", $arResult["opened"])) . "'";
				}
				else
				{
					$arResult["opened"] = "reg";
					echo "'reg'";
				}
				?>];
			//-->

			var cookie_prefix = '<?=$arResult["COOKIE_PREFIX"]?>';
		</script>
		<form method="post" name="form1" action="<?= $arResult["FORM_TARGET"] ?>" enctype="multipart/form-data">
			<?= $arResult["BX_SESSION_CHECK"] ?>
			<input type="hidden" name="lang" value="<?= LANG ?>"/>
			<input type="hidden" name="ID" value=<?= $arResult["ID"] ?>/>

			<div class="profile-link" style="text-align: center"><div title="<?= GetMessage(
					"REG_SHOW_HIDE"
				) ?>"><?= GetMessage("REG_SHOW_HIDE") ?></div>
				<!--				href="javascript:void(0)" onclick="SectionClick('reg')"-->
			</div>
			<div class="profile-block-<?= strpos($arResult["opened"], "reg") === false ? "hidden"
				: "shown" ?>" id="user_div_reg">
				<table class="profile-table data-table">
					<thead>
					<tr>
						<td colspan="2">&nbsp;</td>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td><?= GetMessage('NAME') ?></td>
						<td><input type="text" name="NAME" maxlength="50" value="<?= $arResult["arUser"]["NAME"] ?>"/>
						</td>
					</tr>
					<tr>
						<td><?= GetMessage('LAST_NAME') ?></td>
						<td>
							<input type="text" name="LAST_NAME" maxlength="50" value="<?= $arResult["arUser"]["LAST_NAME"] ?>"/>
						</td>
					</tr>
<!--					<tr>-->
<!--						<td>--><?php //= GetMessage('LOGIN') ?><!--<span class="starrequired">*</span></td>-->
<!--						<td><input type="text" name="LOGIN" maxlength="50" value="--><?//
// 							echo $arResult["arUser"]["LOGIN"] ?><!--"/></td>-->
<!--					</tr>-->
					<tr>
						<td><?= GetMessage('EMAIL') ?><?
							if ($arResult["EMAIL_REQUIRED"]): ?><span class="starrequired">*</span><?
							endif ?></td>
						<td><input type="text" name="EMAIL" maxlength="50" value="<?
							echo $arResult["arUser"]["EMAIL"] ?>"/></td>
					</tr>
					<?
					if ($arResult["PHONE_REGISTRATION"]): ?>
						<tr>
							<td><?
								echo GetMessage("main_profile_phone_number") ?><?
								if ($arResult["PHONE_REQUIRED"]): ?><span class="starrequired">*</span><?
								endif ?></td>
							<td><input type="text" name="PHONE_NUMBER" maxlength="50" value="<?
								echo $arResult["arUser"]["PHONE_NUMBER"] ?>"/></td>
						</tr>
					<?
					endif ?>
					<?
					if ($arResult['CAN_EDIT_PASSWORD']): ?>
						<tr>
						<td><?= GetMessage('NEW_PASSWORD_REQ') ?></td>
						<td>
						<input type="password" name="NEW_PASSWORD" maxlength="50" value="" autocomplete="off" class="bx-auth-input"/>
						<?
						if ($arResult["SECURE_AUTH"]): ?>
							<span class="bx-auth-secure" id="bx_auth_secure" title="<?
							echo GetMessage("AUTH_SECURE_NOTE") ?>" style="display:none">
					<div class="bx-auth-secure-icon"></div>
				</span>
							<noscript>
				<span class="bx-auth-secure" title="<?
				echo GetMessage("AUTH_NONSECURE_NOTE") ?>">
					<div class="bx-auth-secure-icon bx-auth-secure-unlock"></div>
				</span>
							</noscript>
							<script type="text/javascript">
								document.getElementById('bx_auth_secure').style.display = 'inline-block';
							</script>
							</td>
							</tr>
						<?
						endif ?>
						<tr>
							<td><?= GetMessage('NEW_PASSWORD_CONFIRM') ?></td>
							<td>
								<input type="password" name="NEW_PASSWORD_CONFIRM" maxlength="50" value="" autocomplete="off"/>
							</td>
						</tr>
					<?
					endif ?>
					<?
					if ($arResult["TIME_ZONE_ENABLED"] == true): ?>
						<tr>
							<td colspan="2" class="profile-header"><?
								echo GetMessage("main_profile_time_zones") ?></td>
						</tr>
						<tr>
							<td><?
								echo GetMessage("main_profile_time_zones_auto") ?></td>
							<td>
								<select name="AUTO_TIME_ZONE" onchange="this.form.TIME_ZONE.disabled=(this.value != 'N')">
									<option value=""><?
										echo GetMessage("main_profile_time_zones_auto_def") ?></option>
									<option value="Y"<?= ($arResult["arUser"]["AUTO_TIME_ZONE"] == "Y"
										? ' SELECTED="SELECTED"' : '') ?>><?
										echo GetMessage("main_profile_time_zones_auto_yes") ?></option>
									<option value="N"<?= ($arResult["arUser"]["AUTO_TIME_ZONE"] == "N"
										? ' SELECTED="SELECTED"' : '') ?>><?
										echo GetMessage("main_profile_time_zones_auto_no") ?></option>
								</select>
							</td>
						</tr>
						<tr>
							<td><?
								echo GetMessage("main_profile_time_zones_zones") ?></td>
							<td>
								<select name="TIME_ZONE"<?
								if ($arResult["arUser"]["AUTO_TIME_ZONE"] <> "N")
									echo ' disabled="disabled"' ?>>
									<?
									foreach ($arResult["TIME_ZONE_LIST"] as $tz => $tz_name): ?>
										<option value="<?= htmlspecialcharsbx(
											$tz
										) ?>"<?= ($arResult["arUser"]["TIME_ZONE"] == $tz ? ' SELECTED="SELECTED"'
											: '') ?>><?= htmlspecialcharsbx($tz_name) ?></option>
									<?
									endforeach ?>
								</select>
							</td>
						</tr>
					<?
					endif ?>
					</tbody>
				</table>
			</div>

			<?
			if ($arResult["INCLUDE_FORUM"] == "Y")
			{
				?>

				<div class="profile-link profile-user-div-link"><a title="<?= GetMessage(
						"USER_SHOW_HIDE"
					) ?>" href="javascript:void(0)" onclick="SectionClick('forum')"><?= GetMessage("forum_INFO") ?></a>
				</div>
				<div id="user_div_forum" class="profile-block-<?= strpos($arResult["opened"], "forum") === false
					? "hidden" : "shown" ?>">
					<table class="data-table profile-table">
						<thead>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td><?= GetMessage("forum_SHOW_NAME") ?></td>
							<td>
								<input type="hidden" name="forum_SHOW_NAME" value="N"/><input type="checkbox" name="forum_SHOW_NAME" value="Y" <? if (
									$arResult["arForumUser"]["SHOW_NAME"]
									== "Y"
								) {
									echo "checked=\"checked\"";
								} ?> /></td>
						</tr>
						<tr>
							<td><?= GetMessage('forum_DESCRIPTION') ?></td>
							<td>
								<input type="text" name="forum_DESCRIPTION" maxlength="255" value="<?= $arResult["arForumUser"]["DESCRIPTION"] ?>"/>
							</td>
						</tr>
						<tr>
							<td><?= GetMessage('forum_INTERESTS') ?></td>
							<td>
								<textarea cols="30" rows="5" name="forum_INTERESTS"><?= $arResult["arForumUser"]["INTERESTS"]; ?></textarea>
							</td>
						</tr>
						<tr>
							<td><?= GetMessage("forum_SIGNATURE") ?></td>
							<td>
								<textarea cols="30" rows="5" name="forum_SIGNATURE"><?= $arResult["arForumUser"]["SIGNATURE"]; ?></textarea>
							</td>
						</tr>
						<tr>
							<td><?= GetMessage("forum_AVATAR") ?></td>
							<td><?= $arResult["arForumUser"]["AVATAR_INPUT"] ?>
								<?
								if ($arResult["arForumUser"]["AVATAR"] <> '')
								{
									?>
									<br/><?= $arResult["arForumUser"]["AVATAR_HTML"] ?>
									<?
								}
								?></td>
						</tr>
						</tbody>
					</table>
				</div>

				<?
			}
			?>
			<?
			if ($arResult["INCLUDE_BLOG"] == "Y")
			{
				?>
				<div class="profile-link profile-user-div-link"><a title="<?= GetMessage(
						"USER_SHOW_HIDE"
					) ?>" href="javascript:void(0)" onclick="SectionClick('blog')"><?= GetMessage("blog_INFO") ?></a>
				</div>
				<div id="user_div_blog" class="profile-block-<?= strpos($arResult["opened"], "blog") === false
					? "hidden" : "shown" ?>">
					<table class="data-table profile-table">
						<thead>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td><?= GetMessage('blog_ALIAS') ?></td>
							<td>
								<input class="typeinput" type="text" name="blog_ALIAS" maxlength="255" value="<?= $arResult["arBlogUser"]["ALIAS"] ?>"/>
							</td>
						</tr>
						<tr>
							<td><?= GetMessage('blog_DESCRIPTION') ?></td>
							<td>
								<input class="typeinput" type="text" name="blog_DESCRIPTION" maxlength="255" value="<?= $arResult["arBlogUser"]["DESCRIPTION"] ?>"/>
							</td>
						</tr>
						<tr>
							<td><?= GetMessage('blog_INTERESTS') ?></td>
							<td>
								<textarea cols="30" rows="5" class="typearea" name="blog_INTERESTS"><? echo $arResult["arBlogUser"]["INTERESTS"]; ?></textarea>
							</td>
						</tr>
						<tr>
							<td><?= GetMessage("blog_AVATAR") ?></td>
							<td><?= $arResult["arBlogUser"]["AVATAR_INPUT"] ?>
								<?
								if ($arResult["arBlogUser"]["AVATAR"] <> '')
								{
									?>
									<br/><?= $arResult["arBlogUser"]["AVATAR_HTML"] ?>
									<?
								}
								?></td>
						</tr>
						</tbody>
					</table>
				</div>
				<?
			}
			?>
			<?
			if ($arResult["INCLUDE_LEARNING"] == "Y"): ?>
				<div class="profile-link profile-user-div-link"><a title="<?= GetMessage(
						"USER_SHOW_HIDE"
					) ?>" href="javascript:void(0)" onclick="SectionClick('learning')"><?= GetMessage(
							"learning_INFO"
						) ?></a></div>
				<div id="user_div_learning" class="profile-block-<?= strpos($arResult["opened"], "learning") === false
					? "hidden" : "shown" ?>">
					<table class="data-table profile-table">
						<thead>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td><?= GetMessage("learning_PUBLIC_PROFILE"); ?>:</td>
							<td>
								<input type="hidden" name="student_PUBLIC_PROFILE" value="N"/><input type="checkbox" name="student_PUBLIC_PROFILE" value="Y" <?
								if ($arResult["arStudent"]["PUBLIC_PROFILE"] == "Y") {
									echo "checked=\"checked\"";
								} ?> /></td>
						</tr>
						<tr>
							<td><?= GetMessage("learning_RESUME"); ?>:</td>
							<td>
								<textarea cols="30" rows="5" name="student_RESUME"><?= $arResult["arStudent"]["RESUME"]; ?></textarea>
							</td>
						</tr>

						<tr>
							<td><?= GetMessage("learning_TRANSCRIPT"); ?>:</td>
							<td><?= $arResult["arStudent"]["TRANSCRIPT"]; ?>-<?= $arResult["ID"] ?></td>
						</tr>
						</tbody>
					</table>
				</div>
			<?
			endif; ?>

			<?
			// ********************* User properties ***************************************************?>
			<?
			if ($arResult["USER_PROPERTIES"]["SHOW"] == "Y"): ?>
				<div class="profile-link profile-user-div-link"><a title="<?= GetMessage(
						"USER_SHOW_HIDE"
					) ?>" href="javascript:void(0)" onclick="SectionClick('user_properties')"><?= trim(
							$arParams["USER_PROPERTY_NAME"]
						) <> '' ? $arParams["USER_PROPERTY_NAME"] : GetMessage("USER_TYPE_EDIT_TAB") ?></a></div>
				<div id="user_div_user_properties" class="profile-block-<?= strpos(
					$arResult["opened"],
					"user_properties"
				) === false ? "hidden" : "shown" ?>">
					<table class="data-table profile-table">
						<thead>
						<tr>
							<td colspan="2">&nbsp;</td>
						</tr>
						</thead>
						<tbody>
						<?
						$first = true; ?>
						<?
						foreach ($arResult["USER_PROPERTIES"]["DATA"] as $FIELD_NAME => $arUserField): ?>
							<tr>
								<td class="field-name">
									<?
									if ($arUserField["MANDATORY"] == "Y"): ?>
										<span class="starrequired">*</span>
									<?
									endif; ?>
									<?= $arUserField["EDIT_FORM_LABEL"] ?>:
								</td>
								<td class="field-value">
									<?
									$APPLICATION->IncludeComponent(
										"bitrix:system.field.edit",
										$arUserField["USER_TYPE"]["USER_TYPE_ID"],
										["bVarsFromForm" => $arResult["bVarsFromForm"], "arUserField" => $arUserField],
										null,
										["HIDE_ICONS" => "Y"]
									); ?></td>
							</tr>
						<?
						endforeach; ?>
						</tbody>
					</table>
				</div>
			<?
			endif; ?>
			<?
			// ******************** /User properties ***************************************************?>
			<p style="text-align: center; font-size: 1.2em"><?php echo $arResult["GROUP_POLICY"]["PASSWORD_REQUIREMENTS"]; ?></p>
			<p style="text-align: center;"> <!-- Центрирование содержимого -->
				<input type="submit" name="save" value="<?= (($arResult["ID"] > 0) ? GetMessage("MAIN_SAVE") : GetMessage("MAIN_ADD")) ?>">
				&nbsp;&nbsp;
				<input type="reset" value="<?= GetMessage('MAIN_RESET'); ?>">
			</p>
		</form>
		<?
		if ($arResult["SOCSERV_ENABLED"])
		{
			$APPLICATION->IncludeComponent(
				"bitrix:socserv.auth.split",
				".default",
				[
					"SHOW_PROFILES" => "N",
					"ALLOW_DELETE" => "N",
				],
				false
			);
		}
		?>

	<?
	endif ?>

</div>