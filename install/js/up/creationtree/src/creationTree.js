import {Tag, Type} from 'main.core';
import {Requests} from "./requests.js";
import {Helper} from "./helper.js";
import {DownloadJson} from "./downloadJson.js";
import {CreatedNode} from "./createdNode";
import {Family} from "./templates/family.js";
import {Original} from "./templates/original.js";
import {Sriniz} from "./templates/sriniz.js";
import {Multiple} from "./templates/multiple.js";
import {John} from "./templates/john.js";

export class CreationTree
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Tree: options.rootNodeId required');
		}

		this.rootNode = BX(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Tree: element with id "${this.rootNodeId}" not found`);
		}

		this.nodeList = [];

		this.isHandlerAdded = false

		const buttonJSON = BX('json');
		BX.bind(buttonJSON, 'click', () => {
			this.nodeList.persons.forEach(person => {
				DownloadJson.changeKey(person, 'mid', 'mother');
				DownloadJson.changeKey(person, 'fid', 'farther');
				DownloadJson.changeKey(person, 'pids', 'partners');
			})
			DownloadJson.download(this.nodeList.persons, "familyTree")
		});

		setTimeout(() => {
			this.reload();
		}, 300)

	}

	reload()
	{
		const id = parseInt(window.location.href.match(/\d+/));
		Requests.loadNodes(id).then(nodeList => {
			this.nodeList = nodeList;

			this.nodeList.persons.forEach(person => {
				person.birthDate = new Date(person.birthDate);

				person.active = person.active !== '0';

				let newStyles = document.createElement('style')
				document.head.append(newStyles);

				if (person.active) {
					newStyles.innerHTML = `svg.hugo [data-n-id="${person.id}"].node>rect {
							fill: #FFE13E
						}`
				}
				else {
					if (person.gender.length !== 0) {
						newStyles.innerHTML = `svg.hugo [data-n-id="${person.id}"].node>rect {
							fill: url(#hugo_grad_${person.gender})
						}`
					}
				}
			})

			this.render();
		});
	}

	tree(nameTemplate)
	{
		localStorage.setItem('template', nameTemplate);

		let family = Family.create(this.nodeList.persons, nameTemplate);

		if (nameTemplate === 'hugo') {
			Original.stylingNode(family);
		}
		else if (nameTemplate === 'sriniz') {
			Sriniz.stylingNode(family);
		}
		else if (nameTemplate === 'main')
		{
			Multiple.stylingNode(family);
		}
		else if (nameTemplate === 'john')
		{
			John.stylingNode(family);
		}


		const self = this;
		const buttonPDF = BX('pdf');
		BX.bind(buttonPDF, 'click', () => {
			family.exportPDF();
		});

		family.onUpdateNode((args) =>
		{
			const updateNodes = args.updateNodesData;
			const addNodes = args.addNodesData;
			const removeNodes = args.removeNodeId;

			if (Object.keys(addNodes).length !== 0 &&  Object.keys(updateNodes).length !== 0 && removeNodes === null && !addNodes[0].pids) {

				if (updateNodes[0].mid)
				{
					addNodes[0].child = {mid: Number(updateNodes[0].id)};
				}
				else if(updateNodes[0].fid)
				{
					addNodes[0].child = {fid: Number(updateNodes[0].id)};
				}
			}

			if (Object.keys(updateNodes).length === 2 && addNodes[0].pids) {
				updateNodes.forEach(node => {

					if (node.fid && node.fid === addNodes[0].id)
					{
						addNodes[0].child = {fid: updateNodes[0].id};

					} else if (node.mid && node.mid === addNodes[0].id)
					{
						addNodes[0].child = {mid: updateNodes[0].id};
					}

				})
			}
		});


		family.nodeMenuUI.on('show', function(sender, args){
			args.menu = {
				edit: {
					text: 'Edit',
				},
				remove: {
					text: 'Remove',
					onClick: function onClick() {
						if (typeof args.firstNodeId === "number") {
							if (confirm("Are you sure you are going to remove this family member?")) {
								Requests.removeNode(args.firstNodeId).then(node => {
									self.reload();
								});
							}
						} else {
							if (confirm("Are you sure you are going to remove this family member?")) {
								self.reload();
							}
						}

					},
				},
			}
		});

		let onUpdateNodeAdded = false;
		let onUpdatePerson = false;

		family.on('init', function (sender, args) {
			if (self.nodeList.persons.length === 1) {

				sender.editUI.show(self.nodeList.persons[0].id, false);

				const saveButton = document.querySelector('[data-edit-from-save]');
				const inputName = document.querySelector('[data-binding="name"]');
				inputName.addEventListener('input', (el) => {
					saveButton.disabled = inputName.value.length <= 0;
				})

				let statusRequest = CreatedNode.requestCreationNode(self.nodeList.persons[0].id, family, onUpdateNodeAdded, onUpdatePerson, self);

				onUpdateNodeAdded = statusRequest[0];
				onUpdatePerson = statusRequest[1];

				const form = document.querySelector('.bft-edit-form');
				const editForm = document.querySelector('.bft-form-fieldset');

				const warningName = document.querySelector('[data-bft-edit-from-btns]');

				const textWarning = Tag.render`
						<div class="warning-text">*Поле "имя" является обязательным</div>
					`;

				BX.append(textWarning, warningName);

				form.enctype = "multipart/form-data";
				form.action = '/tree/{id}/';
				const formFile = Tag.render`
				<label class="input-file">
					<span class="input-file-text" type="text"></span>
					<input id="photoName" type="file" name="photo">
					<span class="input-file-btn">Выберите файл</span>
				</label>
				`;

				editForm.append(formFile);

				BX('photoName').addEventListener('change', function(){
						let file = this.files[0];
						document.querySelector('.input-file-text').innerHTML = file.name;
					}
				);

			}
		})

		family.on('updated', function (sender, args) {
			if (args.addNodesData.length !== 0) {
				if (typeof args.addNodesData[0].id === 'string') {

					sender.editUI.show(args.addNodesData[0].id, false);

					const saveButton = document.querySelector('[data-edit-from-save]');
					saveButton.disabled = true;
					const inputName = document.querySelector('[data-binding="name"]');
					inputName.addEventListener('input', (el) => {
						saveButton.disabled = inputName.value.length <= 0;
					})

					onUpdateNodeAdded = CreatedNode.addRequestNode(family, onUpdateNodeAdded, self);

					const form = document.querySelector('.bft-edit-form');
					const editForm = document.querySelector('.bft-form-fieldset');
					const warningName = document.querySelector('[data-bft-edit-from-btns]');

					const textWarning = Tag.render`
						<div class="warning-text">*Поле "имя" является обязательным</div>
					`;

					BX.append(textWarning, warningName);

					form.enctype = "multipart/form-data";
					form.action = '/tree/{id}/';
					const formFile = Tag.render`
					<label class="input-file">
						<span class="input-file-text" type="text"></span>
						<input id="photoName" type="file" name="photo">
						<span class="input-file-btn">Выберите файл</span>
					</label>
					`;

					editForm.append(formFile);

					BX('photoName').addEventListener('change', function(){
							let file = this.files[0];
							document.querySelector('.input-file-text').innerHTML = file.name;
						}
					);

					const closeButton = document.querySelector('[data-edit-from-cancel]');
					const clonedButton = closeButton.cloneNode(true);

					closeButton.parentNode.replaceChild(clonedButton, closeButton);

					clonedButton.addEventListener('click', () => {
						if (confirm("The node you created will not be saved. Are you sure you want to close the form?")) {
							sender.editUI.hide();
						}
					})

					family.editUI.on('hide', function () {
						self.reload();
					})

				}
			}
		})

		family.on('click', function(sender, args){
			let statusRequest = CreatedNode.requestCreationNode(args.node.id, family, onUpdateNodeAdded, onUpdatePerson, self);

			onUpdateNodeAdded = statusRequest[0];
			onUpdatePerson = statusRequest[1];

			sender.editUI.show(args.node.id, false);

			const saveButton = document.querySelector('[data-edit-from-save]');
			const inputName = document.querySelector('[data-binding="name"]');
			inputName.addEventListener('input', (el) => {
				saveButton.disabled = inputName.value.length <= 0;
			})

			const form = document.querySelector('.bft-edit-form');
			const editForm = document.querySelector('.bft-form-fieldset');

			const warningName = document.querySelector('[data-bft-edit-from-btns]');

			const textWarning = Tag.render`
						<div class="warning-text">*Поле "имя" является обязательным</div>
					`;

			BX.append(textWarning, warningName);

			form.enctype = "multipart/form-data";
			form.action = '/tree/{id}/';
			const formFile = Tag.render`
				<label class="input-file">
					<span class="input-file-text" type="text"></span>
					<input id="photoName" type="file" name="photo">
					<span class="input-file-btn">Выберите файл</span>
				</label>
			`;

			editForm.append(formFile);

			BX('photoName').addEventListener('change', function(){
					let file = this.files[0];
					document.querySelector('.input-file-text').innerHTML = file.name;
				}
			);

			return false;
		})
	}

	render()
	{
		Helper.addRelation(this.nodeList);

		if (localStorage.getItem('template')) {
			this.tree(localStorage.getItem('template'));
		} else {
			this.tree('hugo');
		}

		BX('tree').style.backgroundColor = localStorage.getItem('mode') ? localStorage.getItem('mode') : '#F1F9F8';

		if (localStorage.getItem('mode')) {
			if (localStorage.getItem('mode') === '#000000') {
				BX('color_mode').checked = true;
			}
		}

		BX('navbar-purchases').innerHTML = localStorage.getItem('titleTemplate') ? localStorage.getItem('titleTemplate') : 'Skins';

		if (!this.isHandlerAdded) {
			BX.bind(BX('Sriniz'), 'click', () => {
				this.tree('sriniz');
				localStorage.setItem('titleTemplate', 'Sriniz');
				this.reload();
			})

			BX.bind(BX('color_mode'), 'click', () => {
				const template = localStorage.getItem('template') ? localStorage.getItem('template'): 'hugo';
				if (BX('color_mode').checked)
				{
					localStorage.setItem('mode', '#000000');
					this.tree(template);
					this.reload();
				}
				else {
					localStorage.setItem('mode', '#F1F9F8');
					this.tree(template);
					this.reload();
				}
			})

			BX.bind(BX('Hugo'), 'click', () => {
				this.tree('hugo');
				localStorage.setItem('titleTemplate', 'Hugo');
				this.reload();
			})

			BX.bind(BX('Multiple'), 'click', () => {
				this.tree('main');
				localStorage.setItem('titleTemplate', 'Multiple');
				this.reload();
			})

			BX.bind(BX('Royal'), 'click', () => {
				this.tree('john');
				localStorage.setItem('titleTemplate', 'Royal');
				this.reload();
			})

			BX.bind(BX('logout'), 'click', () => {
				localStorage.clear();
			});

			this.isHandlerAdded = true;
		}
	}
}