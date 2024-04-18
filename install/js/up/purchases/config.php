<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/purchases.bundle.css',
	'js' => 'dist/purchases.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
