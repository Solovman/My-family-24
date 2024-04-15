<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/account.bundle.css',
	'js' => 'dist/account.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
