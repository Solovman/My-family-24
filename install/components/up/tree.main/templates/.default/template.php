<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.creationtree');

?>

<div class="container tree__container" id="tree"></div>

<div id="bx_popup_form" style="display:none; padding:10px;min-height: 300px" class="bx_login_popup_form">
	<form class="node__form" enctype="multipart/form-data">
		<h2 class="node__heading"><?= GetMessage('UP_HEADING_ADD_PERSON') ?></h2>
		<div class="node__input-container">
			<div class="node__name">
				<div class="node__input-label">
					<label class="node__label" for="name">First Name:</label>
					<input name="name" class="node__input" id="name" placeholder="Write name" type="text">
				</div>

				<div class="node__input-label">
					<label class="node__label" for="surname">Last Name:</label>
					<input name="surname" class="node__input" id="surname" placeholder="Write surname" type="text">
				</div>
			</div>

			<div class="node__info">
				<div class="node__info_gender">
					<label class="node__label">Gender:</label>

					<div class="node__input-label_info">
						<label class="node__label" for="male">Male</label>
						<input name="gender" class="node__input" id="male" type="radio" value="male">

						<label class="node__label" for="female">Female</label>
						<input name="gender" class="node__input" id="female" type="radio" value="female">
					</div>
				</div>

				<div class="node__info_relation">
					<label class="node__label">Relation Type:</label>

					<div class="node__input-label_info">
						<label class="node__label" for="child">Child</label>
						<input name="relation" class="node__input" id="child" type="radio" value="fid">

						<label class="node__label" for="parent">Parent</label>
						<input name="relation" class="node__input" id="parent" type="radio" value="mid">

						<label class="node__label" for="partner">Partner</label>
						<input name="relation" class="node__input" id="partner" type="radio" value="pids">
					</div>
				</div>
			</div>

			<div class="node__date">
				<div class="node__input-label">
					<label class="node__label" for="birth">Birth Date:</label>
					<input name="birthdate" class="node__input" id="birth" placeholder="Write birth date" type="date">
				</div>

				<div class="node__input-label">
					<label class="node__label" for="death">Death Date</label>
					<input name="deathdate" class="node__input" id="death" placeholder="Write death date" type="date">
				</div>
			</div>

			<div class="node__file">
				<label class="node__label">Add photo:</label>
				<div class="node__input-label">
					<label class="node__input-file">
						<span class="node__input-file-text" type="text"></span>
						<input type="file" name="file">
						<span class="node__input-file-btn">Выберите файл</span>
					</label>
				</div>
			</div>
		</div>
		<button id="addPerson" class="node__form-button" type="submit">Добавить</button>
	</form>
</div>

<script>
	BX.ready(function ()
	{
		const tree = new BX.Up.Tree.CreationTree({
			rootNodeId: 'tree',
		});

	});
</script>




