<?php

declare(strict_types=1);

namespace Up\Tree\Entity;

use http\Env\Url;

class Image
{
	public string $fileName;

	/**
	 * @param string $fileName
	 */
	public function __construct(string $fileName)
	{
		$this->fileName = $fileName;
	}
}