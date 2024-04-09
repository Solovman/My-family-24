import {Type} from 'main.core';
import {Requests} from "./requests.js";
import {Helper} from "./helper.js";

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
			throw new Error('TaskList: options.rootNodeId required');
		}

		this.rootNode = BX(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`TaskList: element with id "${this.rootNodeId}" not found`);
		}

		this.nodeList = [];

		this.reload();
	}

	reload()
	{
		Requests.loadNodes().then(nodeList =>
		{
			this.nodeList = nodeList;

			this.render();
		});
	}

	tree()
	{
		let family =  new FamilyTree(document.getElementById('tree'), {
			mouseScrool: FamilyTree.action.scroll,
			mode: 'light',
			template: 'hugo',
			nodeTreeMenu: true,
			nodeMenu: {
				add: {text: 'Add'},
				edit: {text: 'Edit'},
				details: {text: 'Details'},
			},
			nodes: this.nodeList.persons,
			nodeBinding: {
				field_0: 'name',
				field_1: 'BIRTH_DATE',
			},

			editForm: {
				titleBinding: "name",
				photoBinding: "photo",
				addMore: null,
				generateElementsFromFields: false,
				elements: [
					{type: 'textbox', label: 'Name', binding: 'name'},
					{type: 'textbox', label: 'Surname', binding: 'surname'},
					[
						{type: 'date', label: 'Date Of Birth', binding: 'born'},
						{type: 'date', label: 'Date Of Death', binding: 'death'}
					],
					[
						{
							type: 'select',
							options: [{value: 'male', text: 'Male'}, {value: 'female', text: 'Female'}],
							label: 'Gender',
							binding: 'gender'
						},
					],
					{type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload'},
				]
			},
		});

		const self = this;

		FamilyTree.templates.tommy_male.defs =
			`<g transform="matrix(0.05,0,0,0.05,-12,-9)" id="heart">
       			 <path fill="#F57C00" d="M438.482,58.61c-24.7-26.549-59.311-41.655-95.573-41.711c-36.291,0.042-70.938,15.14-95.676,41.694l-8.431,8.909  l-8.431-8.909C181.284,5.762,98.663,2.728,45.832,51.815c-2.341,2.176-4.602,4.436-6.778,6.778 c-52.072,56.166-52.072,142.968,0,199.134l187.358,197.581c6.482,6.843,17.284,7.136,24.127,0.654 c0.224-0.212,0.442-0.43,0.654-0.654l187.29-197.581C490.551,201.567,490.551,114.77,438.482,58.61z"/>
			<g>
			`
		family.on('expcollclick', function (sender, isCollapsing, nodeId) {
			let node = family.getNode(nodeId);
			if (isCollapsing) {
				family.expandCollapse(nodeId, [], node.ftChildrenIds)
			}
			else {
				family.expandCollapse(nodeId, node.ftChildrenIds, [])
			}
			return false;
		});

		family.on('render-link', function (sender, args) {
			if (args.cnode.ppid != undefined)
				args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xa) + '" y="' + (args.p.ya) + '"/>';
			if (args.cnode.isPartner && args.node.partnerSeparation == 30)
				args.html += '<use data-ctrl-ec-id="' + args.node.id + '" xlink:href="#heart" x="' + (args.p.xb) + '" y="' + (args.p.yb) + '"/>';
		});

		family.on('click', function(sender, args){
			if (args.node.id && typeof args.node.id === "string")
			{
				family.onUpdateNode((args) =>
				{
					const updateNodes = args.updateNodesData;
					const addNodes = args.addNodesData;
					const removeNodes = args.removeNodeId;

					if (Object.keys(addNodes).length === 0 && removeNodes === null)
					{
						const gender = updateNodes[0].gender[0];
						const name = updateNodes[0].name;
						const surname = updateNodes[0].surname;
						let personConnectedId = [Number(updateNodes[0].pids[0])];

						if (updateNodes[0].mid || updateNodes[0].fid)
						{
							if (Helper.isNumeric(updateNodes[0].mid) && Helper.isNumeric(updateNodes[0].fid))
							{
								personConnectedId = [Number(updateNodes[0].mid), Number(updateNodes[0].fid)];
							}
							else if (Helper.isNumeric(updateNodes[0].mid) && !Helper.isNumeric(updateNodes[0].fid))
							{
								personConnectedId = [Number(updateNodes[0].mid)];
							}
							else if (Helper.isNumeric(updateNodes[0].fid) && !Helper.isNumeric(updateNodes[0].mid))
							{
								personConnectedId = [Number(updateNodes[0].fid)]
							}

							Requests.addNode(name, surname, gender, personConnectedId, 'child').then(node => {
								self.reload();
							});

							return;
						}

						if (updateNodes[0].child && updateNodes[0].pids.length === 0 && updateNodes[0].pids[0] !== 0) {
							if (updateNodes[0].child.mid ) {
								personConnectedId = [updateNodes[0].child.mid];
							}
							else
							{
								personConnectedId = [updateNodes[0].child.fid];
							}

							Requests.addNode(name, surname, gender, personConnectedId, 'parent').then(node => {
								self.reload();
							});

							return;
						}

						if (updateNodes[0].child && updateNodes[0].pids.length !== 0 && updateNodes[0].pids[0] !== 0)
						{
							const partner = updateNodes[0].pids[0];
							let childID = 0;

							if (updateNodes[0].child.mid ) {
								childID = updateNodes[0].child.mid;
							}
							else
							{
								childID = updateNodes[0].child.fid;
							}

							personConnectedId = [partner, childID];

							Requests.addNode(name, surname, gender, personConnectedId, 'partnerParent').then(node => {
								self.reload();
							});

							return;
						}

						if (updateNodes[0].pids.length !== 0)
						{
							Requests.addNode(name, surname, gender, personConnectedId, 'partner').then(node => {
								self.reload();
							});

							return;
						}

						Requests.addNode(name, surname, gender, [0], 'init').then(node => {
							self.reload();
						});
					}
				});
			}
		})

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
					text: 'Edit'
				},
				remove: {
					text: 'Remove'
				},
				details: {
					text: "Details"
				}
			}
		});

		return family;
	}

	render()
	{
		Helper.addRelation(this.nodeList);

		this.tree();
	}
}