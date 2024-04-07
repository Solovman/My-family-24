import {Type} from 'main.core';
import {RenderForm} from './renderForm.js';
import {Requests} from "./requests.js";

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

		//this.setEvent();

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

	render()
	{
		let family = new FamilyTree(document.getElementById('tree'), {
			mouseScrool: FamilyTree.none,
			mode: 'light',
			template: 'hugo',
			nodeMenu: {
				add: {text: 'Add'},
				edit: { text: 'Edit' },
				details: { text: 'Details' },
			},
			nodeBinding: {
				field_0: 'NAME',
				field_1: 'BIRTH_DATE',
			},
			editForm: {
				titleBinding: "NAME",
				photoBinding: "photo",
				addMoreBtn: 'Add element',
				addMore: 'Add more elements',
				addMoreFieldName: 'Element name',
				generateElementsFromFields: false,
				elements: [
					{ type: 'textbox', label: 'Full Name', binding: 'NAME' },
					{ type: 'textbox', label: 'Email Address', binding: 'email' },
					[
						{ type: 'textbox', label: 'Phone', binding: 'phone' },
						{ type: 'date', label: 'Date Of Birth', binding: 'born' }
					],
					[
						{ type: 'select', options: [{ value: 'bg', text: 'Bulgaria' }, { value: 'ru', text: 'Russia' }, { value: 'gr', text: 'Greece' }], label: 'Country', binding: 'country' },
						{ type: 'textbox', label: 'City', binding: 'city' },
					],
					{ type: 'textbox', label: 'Photo Url', binding: 'photo', btn: 'Upload' },
				]
			},
		});

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

		const ids = [];

		this.nodeList.forEach(node => {
			ids.push(node.id);
		})

		Requests.getRelation(ids).then((data) => {

			const parents = data[0];
			const married = data[1];

			parents.forEach(parent => {
				const nodeToUpdateParent = this.nodeList.find(node => node.id === parent.id);
				if (nodeToUpdateParent) {
					if (!nodeToUpdateParent.parentIds) {
						nodeToUpdateParent.parentIds = [];
					}
					if (!nodeToUpdateParent.parentIds.includes(parent.parentID)) {
						nodeToUpdateParent.parentIds.push(parent.parentID);
					}
				}

				nodeToUpdateParent.fid = nodeToUpdateParent.parentIds[0];
				nodeToUpdateParent.mid = nodeToUpdateParent.parentIds[1];
			});

			married.forEach(partner => {
				const nodeToUpdateMarried = this.nodeList.find(node => node.id === partner.id);

				if (nodeToUpdateMarried)
				{
					if (!nodeToUpdateMarried.pids) {
						nodeToUpdateMarried.pids = [];
					}
					if (!nodeToUpdateMarried.pids.includes(partner.partnerID)) {
						nodeToUpdateMarried.pids.push(partner.partnerID);
					}
				}
			})
			
			family.load(this.nodeList);
		});

		console.log(this.nodeList);


		family.nodeMenuUI.on('show', function(sender, args){
			args.menu = {
				add: {
					text: "Add",
					onClick: () => {
						RenderForm.addForm(args.firstNodeId)
					}
				},
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
	}

	setEvent()
	{
		const submitButtonAdd = BX('addPerson');

		BX.bind(submitButtonAdd, 'click', function (event)
		{
			event.preventDefault();

			const form = document.querySelector('.node__form');

			const name = BX('name').value;
			const surname = BX('surname').value;

			Requests.addNode(name, surname).then(node => {

				this.nodeList.push({ id: Math.floor(Math.random() * 100), pid: Number(form.id), name: name, img: "https://cdn.balkan.app/shared/5.jpg"});

				this.render();
			});
		}.bind(this));
	}
}
