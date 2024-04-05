import {Type} from 'main.core';
export class CreationTree
{
	constructor(options = {name: 'CreationTree'})
	{
		this.name = options.name;
	}

	setName(name)
	{
		if (Type.isString(name))
		{
			this.name = name;
		}
	}

	render()
	{
		var chart = new OrgChart(document.getElementById("tree"), {
			nodeMenu: {
				details: { text: "Details" },
				edit: { text: "Edit" },
				add: { text: "Add" },
				remove: { text: "Remove" }
			},
			nodeBinding: {
				field_0: "name",
				field_1: "title",
				img_0: "img"
			}
		});

		chart.load([
			{ id: 1, name: "Denny Curtis", title: "CEO", img: "https://cdn.balkan.app/shared/2.jpg" },
			{ id: 2, pid: 1, name: "Ashley Barnett", title: "Sales Manager", img: "https://cdn.balkan.app/shared/3.jpg" },
			{ id: 3, pid: 1, name: "Caden Ellison", title: "Dev Manager", img: "https://cdn.balkan.app/shared/4.jpg" },
		]);
	}
}
