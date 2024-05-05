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
		this.isHandle = false;
		this.loadTrees();
	}

	loadTrees() {
		Requests.getTreesByUserId().then((list) => {
			this.trees = list;

			this.renderSelect();

			if (this.trees.length === 0) {
				const noTree = Tag.render`
					<div style="text-align: center">
						<h2 style="font-size: 24px">Нет созданных деревьев</h2>
					</div>
				`;

				this.rootNode.style.display = 'block';

				BX.append(noTree, this.rootNode);
				return;
			}

			let treeId;
			let type;
			let statistics;
			const selectBoxInput = document.querySelectorAll('.select-box__input-text');
			const selectBoxInputType = document.querySelectorAll('.select-box__input-text-type');
			const checkboxStatistics = document.querySelectorAll('.input-checkbox');

			checkboxStatistics.forEach(checkbox => {
				BX.bind(checkbox, 'click', () => {
					checkboxStatistics.forEach(el => {
						el.checked = false;
					})

					if (checkbox.id === 'age' || checkbox.id === 'weight' || checkbox.id === 'height') {
						selectBoxInputType.forEach(input => {
							input.style.display = 'none';

							BX('bar').style.display = 'block';
						})

						document.querySelectorAll('.select-box__option').forEach(select => {
							if (select.htmlFor === 'doughnutinput' || select.htmlFor === 'pieinput') {
								select.style.display = 'none';
							}
						})

					}else {
						BX('bar').removeAttribute('style');
						selectBoxInputType.forEach(input => {
							input.removeAttribute('style');
						})
						document.querySelectorAll('.select-box__option').forEach(select => {
							select.style.display = 'block';
						})
					}

					checkbox.checked = true;
				})
			})

			selectBoxInput.forEach(input => {
				const displayStyle = window.getComputedStyle(input).display;
				if (displayStyle === 'block') {
					treeId = this.trees.find(item => item.id === parseInt(input.id.match(/\d+/))).id;
				}
			})

			this.requestsData(treeId, 'pie', 'gender');

			const btnSendStatistics = BX('statistics-send');
			if (!this.isHandle) {
				this.isHandle = true;
				BX.bind(btnSendStatistics, 'click', () => {
					BX('statistics-send').disabled = true;

					selectBoxInput.forEach(input => {
						statistics = [];
						const displayStyle = window.getComputedStyle(input).display;
						if (displayStyle === 'block') {
							treeId = this.trees.find(item => item.id === parseInt(input.id.match(/\d+/))).id;
						}
					})

					selectBoxInputType.forEach(input => {
						const displayStyle = window.getComputedStyle(input).display;
						if (displayStyle === 'block') {
							type = input.id;
						}
					})

					checkboxStatistics.forEach(checkbox => {
						if (checkbox.checked)
						{
							statistics = checkbox.id;
						}
					})

					this.requestsData(treeId, type, statistics);
				})
			}
		})
	}

	requestsData(treeID, type, statistics)
	{
		this.rootNode.innerHTML = '';

		if (statistics === 'gender') {
			Requests.getGenderCountByTreeId(treeID).then(result => {
				const data = this.splittingData(result);

				if (data[0].length === 0 || data[1].length === 0) {
					const noData = document.createElement('span');
					noData.textContent = 'Нет данных для построения графика';
					BX.addClass(noData, 'no-data');
					BX.append(noData, this.rootNode);
					BX('statistics-send').disabled = false;
					return;
				}

				this.renderStatistics(type, data[0], data[1], [
					'rgba(54, 162, 235, 0.5)',
					'rgba(255, 99, 132, 0.5)',
				], 'Статистика по полу');

				BX('statistics-send').disabled = false;
			});
		}

		if (statistics === 'age') {
			Requests.getAgesByTreeId(treeID).then(result => {
				console.log(result);
				const data = this.splittingData(result);

				let backgroundColor = [];

				for(let i = 0; i < data[0].length; i++)
				{
					backgroundColor.push(this.getRandomColor(0.5));
				}

				if (data[0].length === 0 || data[1].length === 0) {
					const noData = document.createElement('span');
					noData.textContent = 'Нет данных для построения графика';
					BX.addClass(noData, 'no-data');
					BX.append(noData, this.rootNode);
					BX('statistics-send').disabled = false;
					return;
				}

				this.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по возрасту');
				BX('statistics-send').disabled = false;
			})
		}

		if (statistics === 'height') {
			Requests.getHeightsByTreeId(treeID).then(result => {
				const data = this.splittingData(result);

				let backgroundColor = [];

				for(let i = 0; i < data[0].length; i++)
				{
					backgroundColor.push(this.getRandomColor(0.5));
				}

				if (data[0].length === 0 || data[1].length === 0) {
					const noData = document.createElement('span');
					noData.textContent = 'Нет данных для построения графика';
					BX.addClass(noData, 'no-data');
					BX.append(noData, this.rootNode);
					BX('statistics-send').disabled = false;
					return;
				}

				this.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по росту');
				BX('statistics-send').disabled = false;
			})
		}

		if (statistics === 'weight') {
			Requests.getWeightByTreeId(treeID).then(result => {
				const data = this.splittingData(result);

				let backgroundColor = [];

				for(let i = 0; i < data[0].length; i++)
				{
					backgroundColor.push(this.getRandomColor(0.5));
				}

				if (data[0].length === 0 || data[1].length === 0) {
					const noData = document.createElement('span');
					noData.textContent = 'Нет данных для построения графика';
					BX.addClass(noData, 'no-data');
					BX.append(noData, this.rootNode);
					BX('statistics-send').disabled = false;
					return;
				}

				this.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по весу');
				BX('statistics-send').disabled = false;
			})
		}

		if (statistics === 'education')
		{
			Requests.getEducationCountByTreeId(treeID).then(result => {
				const data = this.splittingData(result);

				let backgroundColor = [];

				for(let i = 0; i < data[0].length; i++)
				{
					backgroundColor.push(this.getRandomColor(0.5));
				}

				if (data[0].length === 0 || data[1].length === 0) {
					const noData = document.createElement('span');
					noData.textContent = 'Нет данных для построения графика';
					BX.addClass(noData, 'no-data');
					BX.append(noData, this.rootNode);
					BX('statistics-send').disabled = false;
					return;
				}

				this.renderStatistics(type, data[0], data[1], backgroundColor, 'Статистика по уровню образования');
				BX('statistics-send').disabled = false;
			})
		}
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
		let options;

		labelCanvas.textContent = label;
		BX.addClass(labelCanvas, 'heading-graphs');

		BX.addClass(containerCanvas, 'container-canvas');

		if (type === 'bar') {
			containerCanvas.style.width = '70%';
			labelCanvas.style.left = '26%';
		}

		if (label === 'Статистика по уровню образования')  {
			labelCanvas.style.left = '20%';
		}

		containerCanvas.innerHTML = '';

		BX.append(labelCanvas, containerCanvas);
		BX.append(canvas, containerCanvas);

		if (type === 'doughnut' || type === 'pie') {
			options = {
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						display: false,
					},
				},

			};
		} else {
			options = {
				plugins: {
					legend: {
						display: false,
					},
				},
				scales: {
					y: {
						beginAtZero: true
					},
				},

			};
		}

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
			options: options

		});

		BX.append(containerCanvas, this.rootNode);
	}

	renderSelect()
	{
		const select = Tag.render`
		<div class="select-box">
			<h2 class="search__heading">Выберите дерево, по которому хотите посмотреть статистику</h2>
			<div class="select-box__current" tabindex="1">
				${this.trees.length === 0 ? `
					<div class="select-box__value">
						<input id="no-tree" class="select-box__input" type="radio" name="trees" checked="checked"/>
						<p class="select-box__input-text">Нет деревьев</p>
					</div>
				` : `
					${this.trees.map(item => `
						<div class="select-box__value">
							<input class="select-box__input" type="radio" id="${item.id}" value="${item.id}" name="trees" checked="checked"/>
							<p id="tree${item.id}" class="select-box__input-text">${BX.util.htmlspecialchars(item.title)}</p>
						</div>
					`).join('')}
				`}
				
				<img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
			</div>
			<ul class="select-box__list">
				${this.trees.length === 0 ? `
					<li>
						<label class="select-box__option" for="no-tree" aria-hidden="aria-hidden">Нет деревьев</label>
					</li>
				` : `
					${this.trees.map(item => `
					<li>
						<label class="select-box__option" for="${item.id}" aria-hidden="aria-hidden">${BX.util.htmlspecialchars(item.title)}</label>
					</li>
           		 `).join('')}`}
			</ul>
		</div>`

		const selectType = Tag.render`
			<div class="select-box">
				<h2 class="search__heading">Выберите вид графиков</h2>
				<div class="select-box__current" tabindex="1">
					<div  class="select-box__value">
						<input class="select-box__input" type="radio" id="doughnutinput" value="doughnut" name="typeStatistics" checked="checked"/>
						<p id="doughnut" class="select-box__input-text-type">${BX.message('UP_TREE_STATISTIC_DOUGHNUT')}</p>
					</div>
					<div class="select-box__value">
						<input class="select-box__input" type="radio" id="barinput" value="bar" name="typeStatistics" checked="checked"/>
						<p id="bar" class="select-box__input-text-type">${BX.message('UP_TREE_STATISTIC_BAR')}</p>
					</div>
						<div class="select-box__value">
						<input class="select-box__input" type="radio" id="pieinput" value="pie" name="typeStatistics" checked="checked"/>
						<p id="pie" class="select-box__input-text-type">${BX.message('UP_TREE_STATISTIC_PIE')}</p>
					</div>
					<img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
				</div>
				<ul class="select-box__list">
					<li>
						<label class="select-box__option" for="doughnutinput" aria-hidden="aria-hidden">${BX.message('UP_TREE_STATISTIC_DOUGHNUT')}</label>
					</li>
					<li>
						<label class="select-box__option" for="barinput" aria-hidden="aria-hidden">${BX.message('UP_TREE_STATISTIC_BAR')}</label>
					</li>
					<li>
						<label class="select-box__option" for="pieinput" aria-hidden="aria-hidden">${BX.message('UP_TREE_STATISTIC_PIE')}</label>
					</li>
				</ul>
			</div>
		`;

		const renderCheckbox = Tag.render`
		<ul class="action-list">
			<li class="action-item">
				<label for="gender" class="label-checkbox">Статистика по полу</label>
				<label class="checkbox">
					<input checked id="gender" value="gender" class="input-checkbox" type="checkbox" />
					<svg viewBox="0 0 21 18">
						<symbol id="tick-path-gender" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
						</symbol>
						<defs>
							<mask id="tick-gender">
								<use class="tick mask" href="#tick-path-gender" />
							</mask>
						</defs>
						<use class="tick" href="#tick-path-gender" stroke="currentColor" />
						<path fill="white" mask="url(#tick-gender)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
					</svg>
					<svg class="lines" viewBox="0 0 11 11">
						<path d="M5.88086 5.89441L9.53504 4.26746" />
						<path d="M5.5274 8.78838L9.45391 9.55161" />
						<path d="M3.49371 4.22065L5.55387 0.79198" />
					</svg>
				</label>
			</li>
			<li class="action-item">
				<label for="age" class="label-checkbox">Статистика по возрасту</label>
				<label class="checkbox">
					<input id="age" value="age" class="input-checkbox" type="checkbox" />
					<svg viewBox="0 0 21 18">
						<symbol id="tick-path-age" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
						</symbol>
						<defs>
							<mask id="tick-age">
								<use class="tick mask" href="#tick-path-age" />
							</mask>
						</defs>
						<use class="tick" href="#tick-path-age" stroke="currentColor" />
						<path fill="white" mask="url(#tick-age)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
					</svg>
					<svg class="lines" viewBox="0 0 11 11">
						<path d="M5.88086 5.89441L9.53504 4.26746" />
						<path d="M5.5274 8.78838L9.45391 9.55161" />
						<path d="M3.49371 4.22065L5.55387 0.79198" />
					</svg>
				</label>
			</li>
			<li class="action-item">
				<label for="weight" class="label-checkbox">Статистика по весу</label>
				<label class="checkbox">
					<input id="weight" value="weight" class="input-checkbox" type="checkbox" />
					<svg viewBox="0 0 21 18">
						<symbol id="tick-path-weight" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
						</symbol>
						<defs>
							<mask id="tick-weight">
								<use class="tick mask" href="#tick-path-weight" />
							</mask>
						</defs>
						<use class="tick" href="#tick-path-weight" stroke="currentColor" />
						<path fill="white" mask="url(#tick-weight)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
					</svg>
					<svg class="lines" viewBox="0 0 11 11">
						<path d="M5.88086 5.89441L9.53504 4.26746" />
						<path d="M5.5274 8.78838L9.45391 9.55161" />
						<path d="M3.49371 4.22065L5.55387 0.79198" />
					</svg>
				</label>
			</li>
			<li class="action-item">
				<label for="height" class="label-checkbox">Статистика по росту</label>
				<label class="checkbox">
					<input id="height" value="height" class="input-checkbox" type="checkbox" />
					<svg viewBox="0 0 21 18">
						<symbol id="tick-path-height" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
						</symbol>
						<defs>
							<mask id="tick-height">
								<use class="tick mask" href="#tick-path-height" />
							</mask>
						</defs>
						<use class="tick" href="#tick-path-height" stroke="currentColor" />
						<path fill="white" mask="url(#tick-height)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
					</svg>
					<svg class="lines" viewBox="0 0 11 11">
						<path d="M5.88086 5.89441L9.53504 4.26746" />
						<path d="M5.5274 8.78838L9.45391 9.55161" />
						<path d="M3.49371 4.22065L5.55387 0.79198" />
					</svg>
				</label>
			</li>
			<li class="action-item">
				<label for="education" class="label-checkbox">Статистика по уровню образования</label>
				<label class="checkbox">
					<input id="education" value="education" class="input-checkbox" type="checkbox" />
					<svg viewBox="0 0 21 18">
						<symbol id="tick-path-education" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
							<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
						</symbol>
						<defs>
							<mask id="tick-education">
								<use class="tick mask" href="#tick-path-education" />
							</mask>
						</defs>
						<use class="tick" href="#tick-path-education" stroke="currentColor" />
						<path fill="white" mask="url(#tick-education)" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
					</svg>
					<svg class="lines" viewBox="0 0 11 11">
						<path d="M5.88086 5.89441L9.53504 4.26746" />
						<path d="M5.5274 8.78838L9.45391 9.55161" />
						<path d="M3.49371 4.22065L5.55387 0.79198" />
					</svg>
				</label>
			</li>
		</ul>`;

		const getButtonStatistics = Tag.render`
			<div class="container-btn-statistics">
				<button id="statistics-send" class="btn-statistics">Показать статистику</button>
			</div>
		`;

		BX.append(select, this.containerSelect);
		BX.append(selectType, this.containerSelect);
		BX.append(renderCheckbox, this.containerSelect);
		BX.append(getButtonStatistics, this.containerSelect);

		BX('statistics-send').disabled = this.trees.length === 0;
	}
}
