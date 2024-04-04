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
		let chart = new OrgChart(document.getElementById("tree"), {
			nodeBinding: {
				field_0: "name"
			},
			nodes: [
				{ id: 1, name: "Amber McKenzie" },
				{ id: 2, pid: 1, name: "Ava Field" },
				{ id: 3, pid: 1, name: "Peter Stevens" }
			]
		});
	}
}
