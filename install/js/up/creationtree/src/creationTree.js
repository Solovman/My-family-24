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

		this.nodeList = [
			{ id: 1, name: "Denny Curtis", img: "https://cdn.balkan.app/shared/2.jpg" },
			{ id: 2, pid: 1, name: "Ashley Barnett", img: "https://cdn.balkan.app/shared/3.jpg" },
			{ id: 3, pid: 1, name: "Caden Ellison", img: "https://cdn.balkan.app/shared/4.jpg" },
		];

		this.setEvent();
	}

	render()
	{
		let chart = new OrgChart(document.getElementById("tree"), {
			nodeMenu: {},
			nodeBinding: {
				field_0: "name",
				img_0: "img"
			}
		});

		chart.load(this.nodeList);

		chart.nodeMenuUI.on('show', function(sender, args){
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

			Requests.loadNode(name, surname).then(node => {

				this.nodeList.push({ id: Math.floor(Math.random() * 100), pid: Number(form.id), name: name, img: "https://cdn.balkan.app/shared/5.jpg"});

				this.render();
			});
		}.bind(this));
	}
}
