<?php

declare(strict_types=1);

use Bitrix\Main\Routing\Controllers\PublicPageController;
use \Bitrix\Main\Routing\RoutingConfigurator;

return function (RoutingConfigurator $routes)
{
	$routes->get('/tree/{id}/', new PublicPageController('/local/modules/up.tree/views/tree-main.php'));

	$routes->post('/tree/{id}/', [\Up\Tree\Controller\Node::class, 'uploadFile']);

	$routes->get('/subscriptions/', new PublicPageController('/local/modules/up.tree/views/tree-subscriptions.php'));

	$routes->get('/', new PublicPageController('/local/modules/up.tree/views/tree-list.php'));

	$routes->get('/account/', new PublicPageController('/local/modules/up.tree/views/tree-account.php'));
	$routes->post('/account/', new PublicPageController('/local/modules/up.tree/views/tree-account.php'));

	$routes->get('/admin/', new PublicPageController('/local/modules/up.tree/views/tree-admin.php'));

	$routes->get('/search/', new PublicPageController('/local/modules/up.tree/views/tree-search.php'));

	$routes->post('/', new PublicPageController('/local/modules/up.tree/views/tree-list.php'));
};
