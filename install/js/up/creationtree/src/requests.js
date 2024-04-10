export class Requests
{

	static loadNodes(id)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.getPersons', {
				data: {
					treeId: id
				}
			}).then((response) => {
				const nodesList = response.data.tree;
				console.log(nodesList);
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