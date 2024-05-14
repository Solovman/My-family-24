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

				resolve(nodesList);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static updateNode(id, active, imageId, lastImageId, name, surname, patronymic, birthDate, deathDate, gender, treeId, weight, height, education)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.update',
				{
				data: {
					id: id,
					updatablePerson: {
						active: active,
						imageId: imageId,
						lastImageId: lastImageId,
						name: name,
						surname: surname,
						patronymic: patronymic,
						birthDate: birthDate,
						deathDate: deathDate,
						gender: gender,
						treeId: treeId,
						weight: weight,
						height: height,
						education: education
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

	static addNode(active, imageId, name, surname, patronymic, gender, birthDate, deathDate, treeId, weight, height, education, personConnectedIds, relationType)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.node.add', {
				data: {
					person: {
						active: active,
						imageId: imageId,
						name: name,
						surname: surname,
						patronymic: patronymic,
						birthDate: birthDate,
						deathDate: deathDate,
						gender: gender,
						treeId: treeId,
						weight: weight,
						height: height,
						education: education
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