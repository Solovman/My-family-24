<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/auth.bundle.css',
	'js' => 'dist/auth.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
