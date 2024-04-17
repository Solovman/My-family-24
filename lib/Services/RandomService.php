<?php

declare(strict_types=1);

namespace Up\Tree\Services;

class RandomService
{
	public static function getRandomGradientColorString(): string
	{
		$colorPairs = [
			['#FF8E00', '#FFE400'],
			['#00AECD', '#00CEA8'],
			['#FF008C', '#FF8E53'],
			['#0075FF', '#00B7FF'],
			['#FF004C', '#FF5252'],
			['#00FF91', '#00FFB0'],

			['#00B4FF', '#00FFC1'],
			['#FF4D00', '#FF9C00'],
			['#00C6FF', '#00FCFF']
		];

		$randomPair = $colorPairs[array_rand($colorPairs)];

		$gradient = 'linear-gradient(0deg, ';
		$gradient .= $randomPair[0] . ' 0%, ';
		$gradient .= $randomPair[1] . ' 100%)';

		return $gradient;
	}
}