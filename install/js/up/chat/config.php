<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/chat.bundle.css',
	'js' => ['dist/chat.bundle.js', 'dist/ws/lib/index.js', 'dist/mysql2/lib/index.js'],
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
