<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true)
{
	die();
}

return [
	'css' => 'dist/statistics.bundle.css',
	'js' => ['dist/statistics.bundle.js', 'dist/chart.js/dist/chart.umd.js'],
	'rel' => [
		'main.core',
	],
	'skip_core' => false,
];
