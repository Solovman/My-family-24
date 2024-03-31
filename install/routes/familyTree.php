<?php

declare(strict_types=1);

use Bitrix\Main\Routing\Controllers\PublicPageController;
use \Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes)
{
    $routes->get('/', new PublicPageController('/local/modules/up.familyTree/views/familyTree-main.php'));
};
