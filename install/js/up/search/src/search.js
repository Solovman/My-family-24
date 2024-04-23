import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";

export class Search
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Search: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Search: element with id "${this.rootNodeId}" not found`);
		}

		this.trees = [];

		this.loadTrees();
	}


	loadTrees() {
		Requests.getListTrees().then((list) => {
			this.trees = list;

			this.renderSelect();

			this.setEvents();
		})
	}

	setEvents()
	{
		const btnSearch = BX('search-relatives');

		BX.bind(btnSearch, 'click', (event) => {
			let treeId;
			const selectBoxInput = document.querySelectorAll('.select-box__input-text');

			selectBoxInput.forEach(input => {
				const displayStyle = window.getComputedStyle(input).display;
				if (displayStyle === 'block') {
					treeId = parseInt(input.id.match(/\d+/));
				}
			})

			Requests.getUsersPersons(treeId).then(result => {
				console.log(result);
			})
		});
	}

	renderSelect()
	{
		const select = Tag.render`
		<div class="select-box">
			<h2 class="search__heading">Выберите дерево, по которому хотите сделать поиск</h2>
			<div class="select-box__current" tabindex="1">
				${this.trees.map(item => `
					<div class="select-box__value">
						<input class="select-box__input" type="radio" id="${item.id}" value="${item.id}" name="trees" checked="checked"/>
						<p id="tree${item.id}" class="select-box__input-text">${item.title}</p>
					</div>
				`).join('')}
			
				<img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
			</div>
			<ul class="select-box__list">
				${this.trees.map(item => `
					<li>
						<label class="select-box__option" for="${item.id}" aria-hidden="aria-hidden">${item.title}</label>
					</li>
           		 `).join('')}
			</ul>
		</div>`

		BX.append(select, this.rootNode)
	}
}
