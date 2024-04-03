<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();
/**
 * @var CMain $APPLICATION
 */
?>

<section class="main container">
	<div class="main__container">
		<h1 class="main__heading">Family Tree</h1>
		<div class="main__tabs-nav">
			<button  class="main__tabs-button main__tabs-button_login _active" data-tab="tab_1"><?= GetMessage('UP_FAMILY_TREE_BUTTON_SIGN_IN_TAB') ?></button>
			<button class="main__tabs-button main__tabs-button_register" data-tab="tab_2"><?= GetMessage('UP_FAMILY_TREE_BUTTON_REGISTER_TAB') ?></button>
		</div>
		<form id="tab_1"  class="main__form main__tabs-item _active">
			<div class="main__container-form">
				<div class="main__container-input">
					<label class="main__label-form" for="email">Email</label>
					<span class="main__icon-input">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#37a969"/>
                        </svg>
                    </span>
					<input  id="email" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_EMAIL') ?>" type="text">
				</div>
				<div class="main__container-input">
					<label class="main__label-form" for="password">Password</label>
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
					<input id="password" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_PASSWORD') ?>" type="text">
				</div>
			</div>
			<button name="login" class="main__button-form" type="submit"><?= GetMessage('UP_FAMILY_TREE_BUTTON_SIGN_IN') ?></button>
		</form>
		<form id="tab_2" class="main__form main__tabs-item" action="/account/" method="post">
			<div class="main__container-form">
				<div class="main__container-input">
					<label class="main__label-form" for="email">Email</label>
					<span class="main__icon-input">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#37a969"/>
                        </svg>
                    </span>
					<input name="email" id="email" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_EMAIL') ?>" type="text">
				</div>
				<div class="main__container-input">
					<label class="main__label-form" for="name">Name</label>
					<span class="main__icon-input">
                        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="6" r="4" stroke="#37a969"" stroke-width="1.5"/>
                            <path d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="#37a969"" stroke-width="1.5"/>
                        </svg>
                    </span>
					<input  name="name" id="name" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_NAME') ?>" type="text">
				</div>
				<div class="main__container-input">
					<label class="main__label-form" for="password">Password</label>
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
					<input name="password" id="password" class="main__input-form" placeholder="<?= GetMessage('UP_FAMILY_TREE_INPUT_PASSWORD') ?>" type="text">
				</div>
			</div>
			<button name="register" class="main__button-form" type="submit"><?= GetMessage('UP_FAMILY_TREE_BUTTON_REGISTER') ?></button>
		</form>
	</div>
</section>


