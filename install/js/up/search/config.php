<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/search.bundle.css',
	'js' => 'dist/search.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
