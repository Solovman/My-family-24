export class Family
{
	static create(list, templateName)
	{
		let family =  new FamilyTree(document.getElementById('tree'), {
			mouseScrool: FamilyTree.action.scroll,
			searchDisplayField: 'name',
			searchFields: ["name", "surname"],
			searchFieldsWeight: {
				"name": 100,
			},
			template: templateName,
			nodeTreeMenu: true,
			nodeMenu: {
				remove: {text: 'Remove'},
				edit: {
					text: 'Edit',
				},
				details: {text: 'Details'},
			},
			nodes: list,
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
					{ type: 'checkbox', label: 'Important', binding: 'active' }
				]
			},
		});

		return family;
	}
}