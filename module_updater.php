<?php

declare(strict_types=1);

use Bitrix\Main\ArgumentOutOfRangeException;
use Bitrix\Main\ModuleManager;
use Bitrix\Main\Config\Option;

/**
 * @throws ArgumentOutOfRangeException
 */
function __familyTreeMigrate(int $nextVersion, callable $callback): void
{
	global $DB;
	$moduleId = 'up.familyTree';

	if (!ModuleManager::isModuleInstalled($moduleId))
	{
		return;
	}

	$currentVersion = (int)Option::get($moduleId, '~database_schema_version', 0);

	if ($currentVersion < $nextVersion)
	{
		include_once($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/classes/general/update_class.php');
		$updater = new \CUpdater();
		$updater->Init('', 'mysql', '', '', $moduleId, 'DB');

		$callback($updater, $DB, 'mysql');
		Option::set($moduleId, '~database_schema_version', $nextVersion);
	}
}
