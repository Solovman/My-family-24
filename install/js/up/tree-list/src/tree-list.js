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

		const addButton = BX('addTreeButton');
		addButton.addEventListener('click', () => {
			this.handleAddTreeButtonClick()});

		this.reload();
	}
	handleAddTreeButtonClick() {

		const inputTitle = BX('treeTitleInput');
		const treeTitle = inputTitle.value.trim();
		const warningMessage = BX('warningMessage');


		if (treeTitle !== '') {

			this.addTree(treeTitle).then(() => {
				inputTitle.value = '';
				this.reload();
			}).catch((error) => {
				console.error('Error adding tree:', error);
			});
		} else {
			warningMessage.textContent = 'Please enter a tree title!';
			console.error('Tree title is empty');
		}
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
	addTree(treeTitle)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.trees.addTree', {
				data: { treeTitle: treeTitle }
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

	render()
	{
		this.rootNode.innerHTML = '';

		const treeContainerNode = Tag.render`<div class="columns my-container"></div>`;

		this.treeList.forEach(trees => {
			const treeNode = Tag.render`
				<div class="columns is-multiline">
					<div class="column is-two-fifth">
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
