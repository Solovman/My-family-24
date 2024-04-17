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
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
		  integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
		  crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
			integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
			crossorigin="anonymous"></script>
	<?php
	$APPLICATION->ShowHead();
	?>
</head>
<body>
<?php $APPLICATION->ShowPanel(); ?>

<header class="header">
	<nav class="header__nav">
		<ul class="header__nav-list">
			<li data-title="<?= GetMessage('UP_HEADER_NAV_MY_TREES') ?>" class="header__nav-item">
				<a href="/" class="header__nav-link">
					<svg class="header__svg" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
						 width="30px" height="30px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                    <g>
						<path class="header__svg-path" fill="#ffff" d="M91.963,80.982l0.023-0.013l-7.285-12.617h2.867v-0.013c0.598,0,1.083-0.484,1.083-1.082
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
			<li id="pdf" data-title="<?= GetMessage('UP_HEADER_NAV_EXPORT') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<rect x="0" fill="none" width="20" height="20"/>
						<g>
							<style>.st0{fill-rule:evenodd;clip-rule:evenodd;}</style>
							<path class="header__svg-path" fill="#ffff" d="M5.8 14H5v1h.8c.3 0 .5-.2.5-.5s-.2-.5-.5-.5zM11 2H3v16h13V7l-5-5zM7.2 14.6c0 .8-.6 1.4-1.4 1.4H5v1H4v-4h1.8c.8 0 1.4.6 1.4 1.4v.2zm4.1.5c0 1-.8 1.9-1.9 1.9H8v-4h1.4c1 0 1.9.8 1.9 1.9v.2zM15 14h-2v1h1.5v1H13v1h-1v-4h3v1zm0-2H4V3h7v4h4v5zm-5.6 2H9v2h.4c.6 0 1-.4 1-1s-.5-1-1-1z"/>
						</g>
					</svg>
				</a>
			</li>
			<li id="json" data-title="<?= GetMessage('UP_HEADER_NAV_JSON') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg  class="header__svg" width="25px" height="25px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<g id="layer1">
							<path class="header__svg-path" d="M 3 0 L 3 12 L 4 12 L 4 1 L 12 1 L 12 4 L 12 5 L 16 5 L 16 12 L 17 12 L 17 5 L 17 4 L 13 0 L 12 0 L 3 0 z M 13 1.3535156 L 15.646484 4 L 13 4 L 13 1.3535156 z M 4 13 L 4 16 L 3.9921875 16.130859 L 3.9667969 16.257812 L 3.9238281 16.382812 L 3.8652344 16.5 L 3.7929688 16.607422 L 3.7070312 16.707031 L 3.609375 16.792969 L 3.5 16.865234 L 3.3828125 16.923828 L 3.2597656 16.964844 L 3.1308594 16.992188 L 3 17 L 2.8691406 16.992188 L 2.7402344 16.964844 L 2.6171875 16.923828 L 2.5 16.865234 L 2.390625 16.792969 L 2.2929688 16.707031 L 2.2070312 16.607422 L 2.1347656 16.5 L 2.0761719 16.382812 L 2.0332031 16.257812 L 2.0078125 16.130859 L 2 16 L 1 16 L 1.0078125 16.183594 L 1.0351562 16.367188 L 1.0761719 16.546875 L 1.1347656 16.722656 L 1.2089844 16.890625 L 1.3007812 17.052734 L 1.4042969 17.205078 L 1.5214844 17.347656 L 1.6523438 17.478516 L 1.7949219 17.595703 L 1.9472656 17.699219 L 2.1074219 17.791016 L 2.2773438 17.865234 L 2.453125 17.923828 L 2.6328125 17.964844 L 2.8164062 17.992188 L 3 18 L 3.1835938 17.992188 L 3.3671875 17.964844 L 3.546875 17.923828 L 3.7226562 17.865234 L 3.8925781 17.791016 L 4.0527344 17.699219 L 4.2050781 17.595703 L 4.3476562 17.478516 L 4.4785156 17.347656 L 4.5957031 17.205078 L 4.6992188 17.052734 L 4.7910156 16.890625 L 4.8652344 16.722656 L 4.9238281 16.546875 L 4.9648438 16.367188 L 4.9921875 16.183594 L 5 16 L 5 13 L 4 13 z M 7.5 13 A 1.5 1.4999999 0 0 0 6 14.5 A 1.5 1.4999999 0 0 0 7.5 16 L 8.5 16 A 0.5 0.5 0 0 1 9 16.5 A 0.5 0.5 0 0 1 8.5 17 L 6 17 L 6 18 L 8.5 18 A 1.5 1.4999999 0 0 0 10 16.5 A 1.5 1.4999999 0 0 0 8.5 15 L 7.5 15 A 0.5 0.5 0 0 1 7 14.5 A 0.5 0.5 0 0 1 7.5 14 L 10 14 L 10 13 L 7.5 13 z M 13 13 L 12.816406 13.007812 L 12.632812 13.033203 L 12.453125 13.076172 L 12.277344 13.134766 L 12.107422 13.208984 L 11.947266 13.298828 L 11.794922 13.404297 L 11.652344 13.521484 L 11.521484 13.652344 L 11.404297 13.794922 L 11.300781 13.947266 L 11.208984 14.107422 L 11.134766 14.277344 L 11.076172 14.451172 L 11.035156 14.632812 L 11.007812 14.816406 L 11 15 L 11 16 L 11.007812 16.183594 L 11.035156 16.367188 L 11.076172 16.546875 L 11.134766 16.722656 L 11.208984 16.890625 L 11.300781 17.052734 L 11.404297 17.205078 L 11.521484 17.347656 L 11.652344 17.478516 L 11.794922 17.595703 L 11.947266 17.699219 L 12.107422 17.791016 L 12.277344 17.865234 L 12.453125 17.923828 L 12.632812 17.964844 L 12.816406 17.992188 L 13 18 L 13.183594 17.992188 L 13.367188 17.964844 L 13.546875 17.923828 L 13.722656 17.865234 L 13.892578 17.791016 L 14.052734 17.699219 L 14.205078 17.595703 L 14.347656 17.478516 L 14.478516 17.347656 L 14.595703 17.205078 L 14.699219 17.052734 L 14.791016 16.890625 L 14.865234 16.722656 L 14.923828 16.546875 L 14.964844 16.367188 L 14.992188 16.183594 L 15 16 L 15 15 L 14.992188 14.816406 L 14.964844 14.632812 L 14.923828 14.451172 L 14.865234 14.277344 L 14.791016 14.107422 L 14.699219 13.947266 L 14.595703 13.794922 L 14.478516 13.652344 L 14.347656 13.521484 L 14.205078 13.404297 L 14.052734 13.298828 L 13.892578 13.208984 L 13.722656 13.134766 L 13.546875 13.076172 L 13.367188 13.033203 L 13.183594 13.007812 L 13 13 z M 16.513672 13 A 0.50005 0.50005 0 0 0 16 13.5 L 16 18 L 17 18 L 17 15.001953 L 19.099609 17.800781 A 0.50005 0.50005 0 0 0 20 17.5 L 20 13 L 19 13 L 19 15.998047 L 16.900391 13.199219 A 0.50005 0.50005 0 0 0 16.513672 13 z M 13 14 L 13.130859 14.007812 L 13.259766 14.033203 L 13.382812 14.076172 L 13.5 14.134766 L 13.609375 14.207031 L 13.707031 14.292969 L 13.792969 14.390625 L 13.865234 14.5 L 13.923828 14.617188 L 13.966797 14.740234 L 13.992188 14.869141 L 14 15 L 14 16 L 13.992188 16.130859 L 13.966797 16.257812 L 13.923828 16.382812 L 13.865234 16.5 L 13.792969 16.607422 L 13.707031 16.707031 L 13.609375 16.792969 L 13.5 16.865234 L 13.382812 16.923828 L 13.259766 16.964844 L 13.130859 16.992188 L 13 17 L 12.869141 16.992188 L 12.740234 16.964844 L 12.617188 16.923828 L 12.5 16.865234 L 12.390625 16.792969 L 12.292969 16.707031 L 12.207031 16.607422 L 12.134766 16.5 L 12.076172 16.382812 L 12.033203 16.257812 L 12.007812 16.130859 L 12 16 L 12 15 L 12.007812 14.869141 L 12.033203 14.740234 L 12.076172 14.617188 L 12.134766 14.5 L 12.207031 14.390625 L 12.292969 14.292969 L 12.390625 14.207031 L 12.5 14.134766 L 12.617188 14.076172 L 12.740234 14.033203 L 12.869141 14.007812 L 13 14 z M 3 19 L 3 20 L 17 20 L 17 19 L 16 19 L 4 19 L 3 19 z " fill="#ffff" stroke-width="4px"/>
						</g>
					</svg>
				</a>
			</li>

			<li data-title="<?= GetMessage('UP_HEADER_NAV_STATISTIC') ?>" class="header__nav-item">
				<a href="#" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<line class="a" x1="2" x2="22" y1="20" y2="20"/>
						<path fill="#ffff" class="a header__svg-path" d="M5,20V8.2A.2.2,0,0,1,5.2,8H7.8a.2.2,0,0,1,.2.2V20"/>
						<path fill="#ffff" class="a header__svg-path" d="M11,20V4.26667C11,4.11939,11.08954,4,11.2,4h2.6c.11046,0,.2.11939.2.26667V20"/>
						<path fill="#ffff" class="a header__svg-path" d="M17,20V11.15c0-.08284.08954-.15.2-.15h2.6c.11046,0,.2.06716.2.15V20"/>
					</svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_BUY_SUBSCRIPTION') ?>" class="header__nav-item">
				<a href="/subscriptions/" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path class="header__svg-path" fill="#ffff" d="M14,6a7.17,7.17,0,0,0-1,.08A4.49,4.49,0,0,0,4,6.5V7A2,2,0,0,0,2,9v9a1.94,1.94,0,0,0,2,2H8.73A8,8,0,1,0,14,6ZM6,6.5a2.51,2.51,0,0,1,5-.24V7H6ZM14,20a6,6,0,1,1,6-6A6,6,0,0,1,14,20Zm-1.5-8v1h4a1,1,0,0,1,1,1v3a1,1,0,0,1-1,1H15v1H13V18H10.5V16h5V15h-4a1,1,0,0,1-1-1V11a1,1,0,0,1,1-1H13V9h2v1h2.5v2Z"/>
						<rect width="24" height="24" fill="none"/>
					</svg>
				</a>
			</li>
			<li data-title="<?= GetMessage('UP_HEADER_NAV_LOGOUT') ?>" class="header__nav-item">
				<a href="/?logout=yes&<?=bitrix_sessid_get()?>" class="header__nav-link">
					<svg class="header__svg" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g id="Interface / Log_Out">
							<path class="header__svg-path-stroke" id="Vector" d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75" stroke="#ffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</g>
					</svg>
				</a>
			</li>
		</ul>
	</nav>
	<div class="my-container">
		<nav class="navbar has-shadow" role="navigation" aria-label="main navigation">
			<div class="navbar-brand">
				<a class="navbar-item has-text-weight-semibold is-size-4 logo" href="/">
					<span>
						<img src="/local/modules/up.tree/images/tree-logo.svg" class="tree__icon">
					</span>
					My Family 24
				</a>

				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div id="navbarBasicExample" class="navbar-menu">
				<div class="navbar-start">

					<a class="navbar-item header_item">
						Documentation
					</a>

					<div class="navbar-item has-dropdown is-hoverable">
						<a class="navbar-link header_item">
							More
						</a>

						<div class="navbar-dropdown">
							<a class="navbar-item header_item">
								About
							</a>
							<a class="navbar-item header_item">
								Contact
							</a>
							<a class="navbar-item header_item" href="mailto:familyTreeTechnicalSupport@gmail.com">
								Report an issue
							</a>
						</div>
					</div>
				</div>

				<div class="navbar-end">
					<div class="navbar-item">
						<div class="buttons">
							<div class="header__icon">
								<span class="header__icon-name">
									<a href="/account/" class="name__link">
										My account: <?= htmlspecialcharsEx(UserService::getUserNameById()) ?: GetMessage('UP_HEADER_ICON_NAME') ?>
									</a>
									<img class="header__image-icon" src="/local/modules/up.tree/images/profile-user.svg" alt="user-icon">
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

	</div>
	</div>
</header>

