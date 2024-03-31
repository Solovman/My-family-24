<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/**
 * @var CMain $APPLICATION
 */

?>
<div class="container">
    <form class="main__form">
        <div class="main__container-form">
            <label class="main__label-form" for="email">Email</label>
            <input  id="email" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_EMAIL') ?>" type="text">
            <label class="main__label-form" for="password">Password</label>
            <input id="password" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_PASSWORD') ?>" type="text">
        </div>
        <button class="main__button-form" type="submit"><?= GetMessage('UP_FAMILY_TREE_BUTTON_SIGN_IN') ?></button>
    </form>
</div>

