<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) die();

/**
 * @var CMain $APPLICATION
 * @var array $arResult
 */

\Bitrix\Main\UI\Extension::load('up.tree-list');
?>


<form action="/" method="post" class="form my-container create-tree-form">
	<div class="columns mb-6">
		<div class="column">
			<div class="field">
				<div class="control">
					<input class="input input-title-tree" type="text" placeholder="Enter a tree title" name="treeTitle" required>
				</div>
			</div>
		</div>
		<div class="column">
			<button type="submit" class="button is-success is-rounded button-add">Create new tree!</button>
		</div>
	</div>
</form>

<div class="columns is-multiline my-container">
	<?php
	foreach ($arResult['TREES'] as $tree): ?>
		<div class="column is-one-fifth">
			<div class="card">
				<header class="card-header is-size-4 emerald-color">
					<a href="/tree/<?= $tree->getId()?>/" class="card-header-title">
						<?= htmlspecialcharsEx($tree->getTitle()) ?>
					</a>
				</header>
				<footer class="card-footer">
					<span class="card-footer-item is-size-6">
						<strong>Created at</strong>: <?= $tree->getCreatedAt()->format($arResult['DATE_FORMAT']) ?>
					</span>
				</footer>
			</div>
		</div>
	<?php
	endforeach; ?>
</div>

<script>
	BX.ready(function ()
	{
		window.TreeList = new BX.Up.Tree.TreeList({});
	});
</script>
