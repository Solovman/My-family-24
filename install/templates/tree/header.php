<?php

declare(strict_types=1);

/**
 * @var CMain $APPLICATION
 */

use Up\Tree\Services\Repository\UserService;

?>

<!doctype html>
<html lang="<?= LANGUAGE_ID; ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?php $APPLICATION->ShowTitle(); ?></title>
	<link rel="stylesheet" href="style/reset.css">
	<?php
	$APPLICATION->ShowHead();
	?>
</head>
<body>
<?php $APPLICATION->ShowPanel(); ?>

<header class="header">
	<nav class="header__nav">
		<ul class="header__nav-list">
			<li class="header__nav-item header__nav-item-tree">
				<a class="header__nav-link" href="/">
					<svg class="header__svg" version="1.0" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						 width="30px" height="30px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
                        <g>
							<path fill="#ffff" d="M20,16h24c0.809,0,1.538-0.487,1.848-1.234c0.31-0.748,0.139-1.607-0.434-2.18l-12-12
                                C33.023,0.195,32.512,0,32,0s-1.023,0.195-1.414,0.586l-12,12c-0.572,0.572-0.743,1.432-0.434,2.18C18.462,15.513,19.191,16,20,16z"/>
							<path fill="#ffff" d="M16,28h32c0.809,0,1.538-0.487,1.848-1.234c0.31-0.748,0.139-1.607-0.434-2.18l-6.545-6.545H21.131
                                l-6.545,6.545c-0.572,0.572-0.743,1.432-0.434,2.18C14.462,27.513,15.191,28,16,28z"/>
							<path fill="#ffff" d="M28,63c0,0.553,0.447,1,1,1h6c0.553,0,1-0.447,1-1v-9h-8V63z"/>
							<path fill="#ffff" d="M57.414,48.586L50.828,42H13.172l-6.586,6.586c-0.572,0.572-0.743,1.432-0.434,2.18
                                C6.462,51.513,7.191,52,8,52h48c0.809,0,1.538-0.487,1.848-1.234C58.157,50.018,57.986,49.158,57.414,48.586z"/>
							<path fill="#ffff" d="M12,40h40c0.809,0,1.538-0.487,1.848-1.234c0.31-0.748,0.139-1.607-0.434-2.18L46.828,30H17.172
                                l-6.586,6.586c-0.572,0.572-0.743,1.432-0.434,2.18C10.462,39.513,11.191,40,12,40z"/>
						</g>
                    </svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_EXPORT') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<rect x="0" fill="none" width="20" height="20"/>
						<g>
							<style>.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
							<path class="header__svg-path" fill="#18873f" d="M5.8 14H5v1h.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zM11 2H3v16h13V7l-5-5zM7.2 14.6c0 .8-.6 1.4-1.4 1.4H5v1H4v-4h1.8c.8 0 1.4.6 1.4 1.4v.2zm4.1.5c0 1-.8 1.9-1.9 1.9H8v-4h1.4c1 0 1.9.8 1.9 1.9v.2zM15 14h-2v1h1.5v1H13v1h-1v-4h3v1zm0-2H4V3h7v4h4v5zm-5.6 2H9v2h.4c.6 0 1-.4 1-1s-.5-1-1-1z"/>
						</g>
					</svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_STATISTIC') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<line class="a" x1="2" x2="22" y1="20" y2="20"/>
						<path fill="#18873f" class="a header__svg-path" d="M5,20V8.2A.2.2,0,0,1,5.2,8H7.8a.2.2,0,0,1,.2.2V20"/>
						<path fill="#18873f" class="a header__svg-path" d="M11,20V4.26667C11,4.11939,11.08954,4,11.2,4h2.6c.11046,0,.2.11939.2.26667V20"/>
						<path fill="#18873f" class="a header__svg-path" d="M17,20V11.15c0-.08284.08954-.15.2-.15h2.6c.11046,0,.2.06716.2.15V20"/>
					</svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_BUY_SUBSCRIPTION') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path class="header__svg-path" fill="#18873f" d="M14,6a7.17,7.17,0,0,0-1,.08A4.49,4.49,0,0,0,4,6.5V7A2,2,0,0,0,2,9v9a1.94,1.94,0,0,0,2,2H8.73A8,8,0,1,0,14,6ZM6,6.5a2.51,2.51,0,0,1,5-.24V7H6ZM14,20a6,6,0,1,1,6-6A6,6,0,0,1,14,20Zm-1.5-8v1h4a1,1,0,0,1,1,1v3a1,1,0,0,1-1,1H15v1H13V18H10.5V16h5V15h-4a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H13V9h2v1h2.5v2Z"/>
						<rect width="24" height="24" fill="none"/>
					</svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_MY_TREES') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg class="header__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						 width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <g>
						<path class="header__svg-path" fill="#18873f" d="M91.963,80.982l0.023-0.013l-7.285-12.617h2.867v-0.013c0.598,0,1.083-0.484,1.083-1.082
                            c0-0.185-0.059-0.351-0.14-0.503l0.019-0.011l-6.737-11.669h1.639v-0.009c0.427,0,0.773-0.347,0.773-0.772
                            c0-0.132-0.042-0.25-0.1-0.359l0.013-0.008l-9.802-16.979l-0.01,0.006c-0.216-0.442-0.66-0.754-1.186-0.754
                            c-0.524,0-0.968,0.311-1.185,0.752l-0.005-0.003l-9.802,16.978l0.002,0.001c-0.061,0.11-0.105,0.231-0.105,0.366
                            c0,0.426,0.346,0.772,0.773,0.772v0.009h1.661l-6.737,11.669l0.003,0.001c-0.085,0.155-0.147,0.324-0.147,0.513
                            c0,0.598,0.485,1.082,1.083,1.082v0.013h2.894l-2.1,3.638l-8.399-14.548h4.046v-0.018c0.844,0,1.528-0.685,1.528-1.528
                            c0-0.26-0.071-0.502-0.186-0.717l0.015-0.009l-9.507-16.467h2.313v-0.012c0.603,0,1.091-0.488,1.091-1.092
                            c0-0.186-0.059-0.353-0.141-0.506l0.019-0.011L36.4,13.125l-0.005,0.003c-0.305-0.625-0.94-1.06-1.683-1.06
                            c-0.758,0-1.408,0.452-1.704,1.1L19.201,37.082l0.003,0.002c-0.086,0.156-0.148,0.326-0.148,0.516c0,0.604,0.488,1.092,1.09,1.092
                            v0.012h2.345l-9.395,16.272c-0.195,0.257-0.316,0.573-0.316,0.92c0,0.844,0.685,1.528,1.528,1.528v0.018h4.084L8.252,75.007
                            c-0.24,0.314-0.387,0.702-0.387,1.128c0,1.032,0.838,1.87,1.871,1.87v0.021h19.779v8.43c0,0.815,0.661,1.477,1.476,1.477h7.383
                            c0.815,0,1.477-0.661,1.477-1.477v-8.43h16.12l-1.699,2.943l0.003,0.002c-0.104,0.189-0.18,0.396-0.18,0.628
                            c0,0.732,0.593,1.325,1.325,1.325v0.015h14.016v3.941c0,0.578,0.469,1.046,1.046,1.046h5.232c0.578,0,1.046-0.468,1.046-1.046
                            v-3.941H90.81v-0.015c0.732,0,1.326-0.593,1.326-1.325C92.135,81.372,92.064,81.168,91.963,80.982z"/>
					</g>
                    </svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_LOGOUT') ?>" class="header__nav-item">
				<a href="/?logout=yes&<?=bitrix_sessid_get()?>" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="Interface / Log_Out">
							<path class="header__svg-path-stroke" id="Vector" d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75" stroke="#18873f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</g>
					</svg>
				</a>
			</li>
		</ul>
	</nav>
	<div class="container">
		<div class="header__main">
			<form class="header__search-form">
				<input class="header__input-search" placeholder="<?= GetMessage('UP_HEADER_PLACEHOLDER_SEARCH')?>" type="text">
				<button class="header__button-search" type="submit">
					<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</form>
			<div class="header__icon">
				<img class="header__image-icon" src="/local/modules/up.tree/images/user_default.png" alt="user-icon">
				<span class="header__icon-name"><?= UserService::getUserNameById() ?></span>
			</div>
		</div>
	</div>
</header>

