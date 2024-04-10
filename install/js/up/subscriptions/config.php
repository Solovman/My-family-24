<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/subscriptions.bundle.css',
	'js' => 'dist/subscriptions.bundle.js',
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
