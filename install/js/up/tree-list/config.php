<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/tree-list.bundle.css',
	'js' => 'dist/tree-list.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
