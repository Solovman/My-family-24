import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";

export class Statistics {o
	constructor(options = {}) {

		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Account: options.rootNodeId required');
		}

		if (Type.isStringFilled(options.rootSelectId))
		{
			this.rootSelectId = options.rootSelectId;
		}
		else
		{
			throw new Error('Account: options.rootSelectId required');
		}

		this.rootNode = BX(this.rootNodeId);
		this.containerSelect = BX(this.rootSelectId);

		if (!this.rootNode)
		{
			throw new Error(`Account: element with id "${this.rootNodeId}" not found`);
		}

		if (!this.containerSelect)
		{
			throw new Error(`Account: element with id "${this.containerSelect}" not found`);
		}


		this.trees = [];
		this.loadTrees();
	}

	loadTrees() {
		Requests.getTreesByUserId().then((list) => {
			this.trees = list;

			this.renderSelect();

			this.requestsData();
		})
	}

	requestsData()
	{
		Requests.getGenderCountByTreeId(1).then(result => {
			const data = this.splittingData(result);

			this.renderStatistics('bar', data[0], data[1], [
				'rgba(54, 162, 235, 0.5)',
				'rgba(255, 99, 132, 0.5)',
			], 'Статистика по полу');
		});

		Requests.getAgesByTreeId(1).then(result => {
			const data = this.splittingData(result);

			let backgroundColor = [];

			for(let i = 0; i < data[0].length; i++)
			{
				backgroundColor.push(this.getRandomColor(0.5));
			}

			this.renderStatistics('bar', data[0], data[1], backgroundColor, 'Статистика по возрасту');
		})

		Requests.getHeightsByTreeId(1).then(result => {
			const data = this.splittingData(result);

			let backgroundColor = [];

			for(let i = 0; i < data[0].length; i++)
			{
				backgroundColor.push(this.getRandomColor(0.5));
			}

			this.renderStatistics('bar', data[0], data[1], backgroundColor, 'Статистика по росту');
		})

		Requests.getWeightByTreeId(1).then(result => {
			const data = this.splittingData(result);

			let backgroundColor = [];

			for(let i = 0; i < data[0].length; i++)
			{
				backgroundColor.push(this.getRandomColor(0.5));
			}

			this.renderStatistics('bar', data[0], data[1], backgroundColor, 'Статистика по весу');
		})
	}

	splittingData(data)
	{
		const keys = [];
		const values = [];
		for (const key in data) {
			if (Object.hasOwnProperty.call(data, key)) {
				if (data[key] && data[key] > 0) {
					keys.push(key);
					values.push(Number(data[key]));
				}
			}
		}

		return [keys, values]
	}

	getRandomColor(alpha = 1)
	{
		const r = Math.floor(Math.random() * 256);
		const g = Math.floor(Math.random() * 256);
		const b = Math.floor(Math.random() * 256);
		return `rgba(${r}, ${g}, ${b}, ${alpha})`;
	}

	renderStatistics(type, labels, data, backgroundColor = null, label) {
		const containerCanvas = document.createElement('div');
		const canvas = document.createElement('canvas');
		const labelCanvas = document.createElement('h2');

		labelCanvas.textContent = label;

		BX.addClass(containerCanvas, 'container-canvas')

		BX.append(labelCanvas, containerCanvas);
		BX.append(canvas, containerCanvas);

		new Chart(canvas, {
			type: type,
			data: {
				labels: labels,
				datasets: [{
					label: '# of Votes',
					data: data,
					borderWidth: 1,
					backgroundColor: backgroundColor,
				}]
			},
			options: {
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						beginAtZero: true
					}
				}
			},

		});

		BX.append(containerCanvas, this.rootNode)
	}

	renderSelect()
	{
		const select = Tag.render`
		<div class="select-box">
			<h2 class="search__heading">Выберите дерево, по которому хотите посмотреть статистику</h2>
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

		BX.append(select, this.containerSelect)
	}
}
