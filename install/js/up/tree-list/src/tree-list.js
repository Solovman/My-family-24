import {Type, Tag} from 'main.core';

export class TreeList
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('TreeList: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`TreeList: element with id "${this.rootNodeId}" not found`);
		}

		this.treeList = [];

		this.reload();
		console.log('qq');
	}

	reload()
	{
		this.loadList()
			.then(treeList => {
				this.treeList = treeList;
				console.log(this.treeList);
				console.log('Hi')
				//this.render();
			});
	}

	loadList()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction(
					'up:tree.trees.getTrees',
					{
						data: {
							apiKey: 'very_secret_key',
						}
					})
				.then((responce) => {
					const treeList = responce.data.treeList;
					console.log(treeList);
					resolve(treeList);
				})
				.catch((error) => {
					console.error(error);
				})
			;
		});
	}

	render()
	{
		this.rootNode.innerHTML = '';

		const treeContainerNode = Tag.render`<div class="columns"></div>`;

		this.treeList.forEach(treeData => {
			const treeNode = Tag.render`
				<div class="column">
					<div class="card project-card">
						<header class="card-header">
							<a class="card-header-title card-header-title-from-database" href="/tree/${treeData.ID}/">
								${treeData.TITLE}
							</a>
						</header>
					</div>
				</div>
			`;

			treeContainerNode.appendChild(treeNode);
		});

		this.rootNode.appendChild(treeContainerNode);
	}
}
