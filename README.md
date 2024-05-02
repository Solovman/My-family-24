# Bitrix service for creating a family tree

Clone repository to `${doc_root}/local/modules`

Install module using admin panel

Set `Family tree template` as your primary site template

## Installing the template:
![template.png](screenshots/template.png)

## Check the boxes in the Bitrix authentication settings:
![register2.png](screenshots%2Fregister2.png)

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

mklink /d C:\OSPanel\domains\dev.tree\local\routes\ C:\OSPanel\domains\dev.tree\local\modules\up.tree\install\routes\

mklink /d C:\OSPanel\domains\dev.tree\local\templates\ C:\OSPanel\domains\dev.tree\local\modules\up.tree\install\templates\

mklink /d C:\OSPanel\domains\dev.tree\local\js\up C:\OSPanel\domains\dev.tree\local\modules\up.tree\install\js\up
```

For correct export to pdf, enter the terminal:
```
node node_modules/@balkangraph/export-service/app.js
```

Going to the directory `${doc_root}/local/modules/up.tree` in the terminal

You must install node.js and then run the command:
```
npm install
```


Create a folder in the `local` folder with the file `php_interface/init.php` and write in it:

```
<?php

\Bitrix\Main\Loader::includeModule('up.tree');
```

After that also add a symbolic link:
```
mklink /d C:\OSPanel\domains\dev.tree\local\modules\up.tree\node_modules\@balkangraph\export-service\upload C:\OSPanel\domains\dev.tree\upload
```