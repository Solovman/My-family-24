<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/treelist.bundle.css',
	'js' => 'dist/treelist.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
