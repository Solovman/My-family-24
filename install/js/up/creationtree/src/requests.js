export class Requests
{

	static loadNodes()
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.getPersons', {

			}).then((response) => {
				const nodesList = response.data.tree;

				resolve(nodesList);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static updateNode(id, name, surname, birthDate, deathDate, gender)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.update', {
				data: {
					id: id,
					updatablePerson: {
						imageId: 0,
						name: name,
						surname: surname,
						birthDate: birthDate,
						deathDate: deathDate,
						gender: gender,
						treeId: 1
					},
				}
			}).then((response) =>
			{
				resolve(response.data);
			})
				.catch((error) =>
				{
					reject(error);
				});
		});
	}

	static addNode(name, surname, gender, birthDate, deathDate, personConnectedIds, relationType)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.add', {
				data: {
					person: {
						imageId: 0,
						name: name,
						surname: surname,
						birthDate: birthDate,
						deathDate: deathDate,
						gender: gender,
						treeId: 1
					},
					personConnectedIds: personConnectedIds,
					relationType: relationType
				}
			}).then((response) =>
			{
				resolve(response.data);
			})
				.catch((error) =>
				{
					reject(error);
				});
		});
	}

	static removeNode(id)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.remove', {
				data: {
					id: id
				}
			}).then((response) =>
			{
				resolve(response.data);
			})
				.catch((error) =>
				{
					reject(error);
				});
		});
	}
}