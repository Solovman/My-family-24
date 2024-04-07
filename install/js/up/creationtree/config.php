<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/creationTree.bundle.css',
	'js' => ['dist/creationTree.bundle.js', 'dist/familytree.js'],
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
