<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */
\Bitrix\Main\UI\Extension::load('up.creationtree');
CJSCore::Init(['popup']);
?>


<div  class="my-container tree__container" style="height: 700px" id="tree">
	<div class="tree__spinner spinner-grow text-primary" role="status">
		<span class="visually-hidden">Loading...</span>
	</div>
</div>

<?php
$APPLICATION->IncludeComponent("up:tree.modalLimit", "", []);
?>


<style id="myStyles">
	@import url("https://fonts.googleapis.com/css?family=Gochi+Hand");
	.node {
		font-family: 'MorningBreeze', sans-serif, Helvetica
	}
	.node.baby rect {
		fill: rgb(255, 202, 40);
	}
</style>

<script>
	BX.ready(function ()
	{
		const tree = new BX.Up.Tree.CreationTree({
			rootNodeId: 'tree',
		});
	});
	BX.message({
		UP_PERSON_FORM_NAME : '<?=GetMessageJS("UP_PERSON_FORM_NAME")?>',
		UP_PERSON_FORM_SURNAME : '<?=GetMessageJS("UP_PERSON_FORM_SURNAME")?>',
		UP_PERSON_FORM_PATRONYMIC : '<?=GetMessageJS("UP_PERSON_FORM_PATRONYMIC")?>',
		UP_PERSON_FORM_BIRTH_DATE : '<?=GetMessageJS("UP_PERSON_FORM_BIRTH_DATE")?>',
		UP_PERSON_FORM_DEATH_DATE : '<?=GetMessageJS("UP_PERSON_FORM_DEATH_DATE")?>',
		UP_PERSON_FORM_HEIGHT : '<?=GetMessageJS("UP_PERSON_FORM_HEIGHT")?>',
		UP_PERSON_FORM_WEIGHT : '<?=GetMessageJS("UP_PERSON_FORM_WEIGHT")?>',
		UP_PERSON_FORM_EDUCATION_LEVEL : '<?=GetMessageJS("UP_PERSON_FORM_EDUCATION_LEVEL")?>',
		UP_PERSON_FORM_EDUCATION_LEVEL_WITHOUT : '<?=GetMessageJS("UP_PERSON_FORM_EDUCATION_LEVEL_WITHOUT")?>',
		UP_PERSON_FORM_EDUCATION_LEVEL_SCHOOL : '<?=GetMessageJS("UP_PERSON_FORM_EDUCATION_LEVEL_SCHOOL")?>',
		UP_PERSON_FORM_EDUCATION_LEVEL_SECONDARY : '<?=GetMessageJS("UP_PERSON_FORM_EDUCATION_LEVEL_SECONDARY")?>',
		UP_PERSON_FORM_EDUCATION_LEVEL_HIGHER : '<?=GetMessageJS("UP_PERSON_FORM_EDUCATION_LEVEL_HIGHER")?>',
		UP_PERSON_FORM_GENDER : '<?=GetMessageJS("UP_PERSON_FORM_GENDER")?>',
		UP_PERSON_FORM_GENDER_MALE : '<?=GetMessageJS("UP_PERSON_FORM_GENDER_MALE")?>',
		UP_PERSON_FORM_GENDER_FEMALE : '<?=GetMessageJS("UP_PERSON_FORM_GENDER_FEMALE")?>',
		UP_PERSON_FORM_MARK : '<?=GetMessageJS("UP_PERSON_FORM_MARK")?>',
		UP_PERSON_FORM_SAVE : '<?=GetMessageJS("UP_PERSON_FORM_SAVE")?>',
		UP_PERSON_FORM_CLOSE : '<?=GetMessageJS("UP_PERSON_FORM_CLOSE")?>',
	});
</script>






