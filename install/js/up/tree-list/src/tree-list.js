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
				this.render();
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
					const treeList = responce.data.trees;
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

		this.treeList.forEach(trees => {
			const treeNode = Tag.render`
				<div class="columns is-multiline my-container">
					<div class="column is-one-fifth">
						<div class="card">
							<header class="card-header is-size-4 emerald-color">
									<a href="/tree/${trees.id}/" class="card-header-title">
										${BX.util.htmlspecialchars(trees.title)}
									</a>
								</header>
								<footer class="card-footer">
									<span class="card-footer-item is-size-6">
										<strong>Created at</strong>: ${BX.date.format('d-m-Y', trees.createdAt)}
									</span>
								</footer>
							</div>
						</div>
					<?php
					endforeach; ?>
				</div>
			`;
			treeContainerNode.appendChild(treeNode);
		});
		this.rootNode.appendChild(treeContainerNode);
	}
}
