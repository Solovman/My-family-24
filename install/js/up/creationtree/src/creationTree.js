import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";
import {Helper} from "./helper.js";
import {DownloadJson} from "./downloadJson.js";
import {CreatedNode} from "./createdNode";

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

		this.reload();

		const buttonJSON = BX('json');
		BX.bind(buttonJSON, 'click', () => {
			this.nodeList.persons.forEach(person => {
				DownloadJson.changeKey(person, 'mid', 'mother');
				DownloadJson.changeKey(person, 'fid', 'farther');
				DownloadJson.changeKey(person, 'pids', 'partners');
			})
			DownloadJson.download(this.nodeList.persons, "familyTree")
		});
	}

	reload()
	{
		const id = parseInt(window.location.href.match(/\d+/));
		Requests.loadNodes(id).then(nodeList => {
			this.nodeList = nodeList;

			this.nodeList.persons.forEach(date => {
				date.birthDate = new Date(date.birthDate);
			})

			this.render();
		});
	}

	tree()
	{
		const lastNode = this.nodeList.persons.length > 0 ? this.nodeList.persons[this.nodeList.persons.length - 1] : null;
		let root = null;

		if (lastNode !== null) {
			this.nodeList.persons.forEach(person => {
				if (person.mid === lastNode.id || person.fid === lastNode.id) {
					root = [lastNode.id];
				}
			})
		}

		console.log(root);

		let treeID =  parseInt(window.location.href.match(/\d+/));
		let family =  new FamilyTree(document.getElementById('tree'), {
			mouseScrool: FamilyTree.action.scroll,
			searchDisplayField: 'name',
			searchFields: ["name", "surname"],
			searchFieldsWeight: {
				"name": 100,
			},
			roots: root,
			mode: 'light',
			template: 'hugo',
			nodeTreeMenu: true,
			nodeMenu: {
				remove: {text: 'Remove'},
				edit: {
					text: 'Edit',
				},
				details: {text: 'Details'},
			},
			nodes: this.nodeList.persons,
			nodeBinding: {
				field_0: 'name',
				field_1: "surname",
				img_0: 'photo'
			},
			exportUrl: 'http://127.0.0.1:1337',
			editForm: {
				titleBinding: "name",
				photoBinding: "photo",
				addMore: null,
				generateElementsFromFields: false,
				buttons: {
					share: null,
					remove: null
				},
				elements: [
					{type: 'textbox', label: 'Name', binding: 'name'},
					{type: 'textbox', label: 'Surname', binding: 'surname'},
					[
						{type: 'date', label: 'Date Of Birth', binding: 'birthDate'},
						{type: 'date', label: 'Date Of Death', binding: 'deathDate'}
					],
					[
						{
							type: 'select',
							options: [{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}],
							label: 'Gender',
							binding: 'gender'
						},
					],
					// { type: 'checkbox', label: 'Click if it\'s you', binding: 'active' }
				]
			},
		});

		family.on('exportstart', function(sender, args){
			args.styles += document.getElementById('myStyles').outerHTML;
		});

		const self = this;
		const buttonPDF = BX('pdf');

		BX.bind(buttonPDF, 'click', () => {
			family.exportPDF();
		});

        FamilyTree.templates.tommy_male.defs =
			`<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart">
       			 <path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/>
			<g>
			`

		family.on('expcollclick', function (sender, isCollapsing, nodeId) {
			let node = family.getNode(nodeId);
			if (isCollapsing) {
				family.expandCollapse(nodeId, [], node.ftChildrenIds);
			} else {
				family.expandCollapse(nodeId, node.ftChildrenIds, []);
			}
			return false;
		});

		family.on('render-link', function (sender, args) {
			if (args.cnode.ppid != undefined)
				args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xa) + '" y="' + (args.p.ya) + '"/>';
			if (args.cnode.isPartner && args.node.partnerSeparation == 30)
				args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xb) + '" y="' + (args.p.yb) + '"/>';
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
						Requests.removeNode(args.firstNodeId).then(node => {
							self.reload();
						});
					},
				},
				details: {
					text: "Details"
				}
			}
		});

		let onUpdateNodeAdded = false;
		let onUpdatePerson = false;

		family.on('click', function(sender, args){

			if (args.node.id && typeof args.node.id === "string" && !onUpdateNodeAdded)
			{
				onUpdateNodeAdded = true;
				family.onUpdateNode((args) =>
				{
					const updateNodes = args.updateNodesData;
					const addNodes = args.addNodesData;
					const removeNodes = args.removeNodeId;

					const formData = new FormData();
					const fileInput = form.querySelector('input[type="file"]');
					formData.append(fileInput.name, fileInput.files[0]);

					if (BX('photoName').value !== '')
					{
						fetch(
							`/tree/${treeID}/`,
							{
								method: 'POST',
								headers: {
									"X-Bitrix-Csrf-Token": BX.bitrix_sessid()
								},
								body: formData
							}
						)
							.then((response) => {
								if (!response.ok) {
									throw new Error('Network response was not ok');
								}
								return response.json();
							})
							.then((response) => {
								updateNodes[0].imageId = response.data.fileId;

								CreatedNode.addNode(updateNodes, addNodes, removeNodes, self);
							})
							.catch((error) => {
								console.error('Error while changing item:', error);
							});
					}
					else
					{
						updateNodes[0].imageId = 1;
						CreatedNode.addNode(updateNodes, addNodes, removeNodes, self);
					}

				});
			}
			else if(!onUpdatePerson)
			{
				onUpdatePerson = true;

				family.onUpdateNode(async (args) => {

					if (Object.keys(args.addNodesData).length !== 0) {
						return;
					}

					const formData = new FormData();
					const fileInput = form.querySelector('input[type="file"]');
					formData.append(fileInput.name, fileInput.files[0]);

					const updateNodes = args.updateNodesData;

					const id = updateNodes[0].id;
					const gender = updateNodes[0].gender[0];
					const name = updateNodes[0].name;
					const imageId = updateNodes[0].imageId;
					const surname = updateNodes[0].surname;
					let birthDate = Helper.formatDate(updateNodes[0].birthDate);
					let deathDate = Helper.formatDate(updateNodes[0].deathDate);

					if (updateNodes[0].deathDate.length === 0) {
						deathDate = null;
					}

					if (updateNodes[0].birthDate.length === 0) {
						birthDate = null;
					}

					if (BX('photoName').value !== '')
					{
						fetch(
							`/tree/${treeID}/`,
							{
								method: 'POST',
								headers: {
									"X-Bitrix-Csrf-Token": BX.bitrix_sessid()
								},
								body: formData
							}
						)
							.then((response) => {
								if (!response.ok) {
									throw new Error('Network response was not ok');
								}
								return response.json();
							})
							.then((response) => {
								const lastImageId = updateNodes[0].imageId;
								updateNodes[0].imageId = response.data.fileId;
								const imageId = updateNodes[0].imageId;

								Requests.updateNode(id, imageId, lastImageId, name, surname, birthDate, deathDate, gender, treeID).then(node => {
									self.reload();
									return node;
								})
							})
							.catch((error) => {
								console.error('Error while changing item:', error);
							});
					}
					else
					{
						Requests.updateNode(id, imageId, 0, name, surname, birthDate, deathDate, gender, treeID).then(node => {
							self.reload();
							return node;
						})
					}
				})
			}

			sender.editUI.show(args.node.id, false);

			const form = document.querySelector('.bft-edit-form');
			const editForm = document.querySelector('.bft-form-fieldset');

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

		this.tree();
	}
}