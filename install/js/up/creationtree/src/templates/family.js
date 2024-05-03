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
				cancelBtn: BX.message('UP_PERSON_FORM_CLOSE'),
				saveAndCloseBtn: BX.message('UP_PERSON_FORM_SAVE'),
				generateElementsFromFields: false,
				buttons: {
					share: null,
					remove: null,
				},
				elements: [
					{type: 'textbox', label: BX.message('UP_PERSON_FORM_NAME'), binding: 'name'},
					{type: 'textbox', label: BX.message('UP_PERSON_FORM_SURNAME'), binding: 'surname'},
					[
						{type: 'date', label: BX.message('UP_PERSON_FORM_BIRTH_DATE'), binding: 'birthDate'},
						{type: 'date', label: BX.message('UP_PERSON_FORM_DEATH_DATE'), binding: 'deathDate'}
					],
					[
						{type: 'textbox', label: BX.message('UP_PERSON_FORM_WEIGHT'), binding: 'weight'},
						{type: 'textbox', label: BX.message('UP_PERSON_FORM_HEIGHT'), binding: 'height'}
					],
					[
						{
							type: 'select',
							options: [{value: 'male', text: BX.message('UP_PERSON_FORM_GENDER_MALE')}, {value: 'female', text: BX.message('UP_PERSON_FORM_GENDER_FEMALE')}],
							label: BX.message('UP_PERSON_FORM_GENDER'),
							binding: 'gender'
						},
					],
					[
						{
							type: 'select',
							options: [
								{value: 'without education', text: BX.message('UP_PERSON_FORM_EDUCATION_LEVEL_WITHOUT')},
								{value: 'school', text: BX.message('UP_PERSON_FORM_EDUCATION_LEVEL_SCHOOL')},
								{value: 'secondary', text: BX.message('UP_PERSON_FORM_EDUCATION_LEVEL_SECONDARY')},
								{value: 'higher', text: BX.message('UP_PERSON_FORM_EDUCATION_LEVEL_HIGHER')},
							],
							label: BX.message('UP_PERSON_FORM_EDUCATION_LEVEL'),
							binding: 'education'
						},
					],
					{ type: 'checkbox', label: BX.message('UP_PERSON_FORM_MARK'), binding: 'active' }
				]
			},
		});

		return family;
	}
}