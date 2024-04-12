export class Requests
{
	static loadList()
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.subscriptions.getList').then((response) =>
			{
				const subscriptionsList = response.data.subscriptionsList;

				resolve(subscriptionsList);
			})
				.catch((error) =>
				{

					reject(error);
				});
		});
	}

	static buy(id)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.subscriptions.buy', {
				data: {
					idSubscriptions: id
				}
			}).then((response) =>
			{
				resolve(response.data);
			})
				.catch((error) =>
				{
					reject(error);
				});
		});
	}
}