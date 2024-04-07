export class Requests
{

	static loadNodes()
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.getPersons', {

			}).then((response) => {
				const nodesList = JSON.parse(response.data.tree);

				console.log(response);

				resolve(nodesList);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static getRelation(ids)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.getPersonRelation', {
				data: {
					ids: ids
				}
			}).then((response) => {
				const result= [];
				const parent = response.data.personParent;
				const married = response.data.personMarried;

				result.push(parent, married);

				resolve(result);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static addNode(name, surname)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.add', {
				data: {
					person: {
						imageId: 1,
						name: name,
						surname: surname,
						birthDate: null,
						deathDate: null,
						gender: 'Male',
						treeId: 1
					},
					relation: {
						parentID: '',
						childID: '',
						personID: '',
						partnerID: ''
					}
				}
			}).then((response) =>
			{
				console.log(response.data);
				resolve(response.data);
			})
				.catch((error) =>
				{
					reject(error);
				});
		});
	}
}