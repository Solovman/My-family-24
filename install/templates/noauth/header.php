<?php

declare(strict_types=1);

/**
 * @var CMain $APPLICATION
 */

use Up\Tree\Services\Repository\UserService;

?>

<!doctype html>
<html lang="<?= LANGUAGE_ID; ?>">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title><?php $APPLICATION->ShowTitle(); ?></title>
	<link rel="stylesheet" href="style/reset.css">
	<?php
	$APPLICATION->ShowHead();
	?>
</head>
<body>
<?php $APPLICATION->ShowPanel(); ?>

<header class="header">

</header>

