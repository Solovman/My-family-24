<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 */

\Bitrix\Main\UI\Extension::load('up.creationtree');

?>

<div class="container tree__container" id="tree"></div>

<div id="bx_popup_form" style="display:none; padding:10px;min-height: 300px" class="bx_login_popup_form">
	<form class="node__form">
		<div class="node__name">
			<label class="node__label" for="name">First Name</label>
			<input class="node__input" id="name" placeholder="Write name" type="text">

			<label class="node__label" for="surname">Last Name</label>
			<input class="node__input" id="surname" placeholder="Write surname" type="text">
		</div>

		<div class="node__info">
<!--			<div class="node__info_gender">-->
<!--				<label class="node__label">Gender:</label>-->
<!---->
<!--				<label for="male">Male</label>-->
<!--				<input class="node__input" id="male" type="radio" value="Male">-->
<!---->
<!--				<label for="female">Female</label>-->
<!--				<input class="node__input" id="female" type="radio" value="Female">-->
<!--			</div>-->

<!--			<div class="node__info_relation">-->
<!--				<label class="node__label">Relation Type:</label>-->
<!---->
<!--				<label for="child">Child</label>-->
<!--				<input class="node__input" id="child" type="radio" value="Child">-->
<!---->
<!--				<label for="parent">Parent</label>-->
<!--				<input class="node__input" id="parent" type="radio" value="Parent">-->
<!--			</div>-->

			<div class="node__date">
				<label class="node__label" for="birth">Birth Date:</label>
				<input class="node__input" id="birth" placeholder="Write birth date" type="date">

				<label class="node__label" for="death">Death Date</label>
				<input class="node__input" id="death" placeholder="Write death date" type="date">
			</div>
		</div>
		<button id="addPerson" class="node__form-button" type="submit">Добавить</button>
	</form>
</div>

<script>
	const tree = new BX.Up.Tree.CreationTree({
		rootNodeId: 'tree',
	});

	tree.render();
</script>




