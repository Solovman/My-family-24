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

		const inputTitle = BX('treeTitleInput');
		inputTitle.addEventListener('keypress', (event) => {
			if (event.key === 'Enter') {
				this.handleAddTreeButtonClick();
			}});
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

	handleRemoveTreeButtonClick()
	{
		const treeId = BX('treeId').value;
		console.log(treeId)
		if (treeId !== '')
		{
			this.removeTree(treeId).then(() => {
				this.reload();
			}).catch((error) => {
				console.error('Error remove tree:', error);
			});
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
	removeTree(id)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.trees.removeTree', {
				data: {
					id: id
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

	render()
	{
		this.rootNode.innerHTML = '';

		const treeContainerNode = Tag.render`<div class="columns cards-container"></div>`;

		this.treeList.forEach(trees => {
			const treeNode = Tag.render`
				<div class="columns is-multiline">
					<div class="column is-two-fifth">
						<div class="card">
							<header class="card-header is-size-4 emerald-color">
									<a href="/tree/${trees.id}/" class="card-header-title">
										${BX.util.htmlspecialchars(trees.title)}
									</a>
									<form method="post" action="/delete/">
										<input type="hidden" name="treeId" value="${trees.id}" id="treeId">
											<button type="button" class="card-header-icon" aria-label="delete task" id="delTreeButton">
											<span class="icon disabled">❌</span>
										</button>
									</form>
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
			// console.log(trees.id)
			treeContainerNode.appendChild(treeNode);
		});
		this.rootNode.appendChild(treeContainerNode);

		const removeButton = BX('delTreeButton');
		removeButton.addEventListener('click', () => {
			this.handleRemoveTreeButtonClick()});
	}
}
