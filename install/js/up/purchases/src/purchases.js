import {Type, Tag} from 'main.core';

export class Purchases
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Purchases: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Purchases: element with id "${this.rootNodeId}" not found`);
		}

		this.purchases = [];

		this.reload();
	}

	reload()
	{
		this.loadList()
			.then(purchases => {
				this.purchases = purchases;
				this.render();
			});
	}

	loadList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:tree.purchases.getPurchases',
					{
						data: {
							apiKey: 'very_secret_key',
						}
					})
				.then((responce) => {
					const purchases = responce.data.purchases;
					console.log(purchases);
					resolve(purchases);
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}
	render()
	{
		this.purchases.forEach(purchases => {
			console.log(purchases);
			const item = Tag.render`
			<a class="navbar-item header_item">
				✧ ${purchases.TITLE}
			</a>
		`;

			BX.append(item, this.rootNode);
		})
	}
}