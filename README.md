# Bitrix service for creating a family tree

Clone repository to `${doc_root}/local/modules`

Install module using admin panel

Set `Family tree template` as your primary site template

## Setup modern Bitrix routing

Add `tree.php` in `routing` section of `${doc_root}/bitrix/.settings.php` file:

```php
'routing' => ['value' => [
	'config' => ['tree.php']
]],
```

Put following content into your `${doc_root}/index.php` file:

```php
<?php
require_once __DIR__ . '/bitrix/routing_index.php';
```

Replace following lines in your `${doc_root}/.htaccess` file:

```
-RewriteCond %{REQUEST_FILENAME} !/bitrix/urlrewrite.php$
-RewriteRule ^(.*)$ /bitrix/urlrewrite.php [L]

+RewriteCond %{REQUEST_FILENAME} !/index.php$
+RewriteRule ^(.*)$ /index.php [L]
```

## Symlinks for handy development


Creating symbolic links for Windows:

```
mklink /d C:\OSPanel\domains\dev.tree\local\components\up C:\OSPanel\domains\dev.tree\local\modules\up.tree\install\components\up

mklink /d C:\OSPanel\domains\dev.tree\local\routes\tree.php C:\OSPanel\domains\dev.tree\local\modules\up.tree\install\routes\tree.php

mklink /d C:\OSPanel\domains\dev.tree\local\templates\tree\ C:\OSPanel\domains\dev.tree\local\modules\up.tree\install\templates\tree
```