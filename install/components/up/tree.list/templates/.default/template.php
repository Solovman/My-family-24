<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */
?>

<div class="columns is-multiline container">
	<?php
	foreach ($arResult['TREES'] as $tree): ?>
		<div class="column">
			<div class="card">
				<header class="card-header">
					<a class="card-header-title">
						<?= htmlspecialcharsEx($tree->getTitle()) ?>
					</a>
				</header>
				<footer class="card-footer">
					<span class="card-footer-item is-size-7">
						<strong>Created at</strong>: <?= $tree->getCreatedAt()->format($arResult['DATE_FORMAT']) ?>
					</span>
				</footer>
			</div>
		</div>
	<?php
	endforeach; ?>
</div>
