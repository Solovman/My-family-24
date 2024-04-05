export class Requests
{
	static loadNode(name, surname)
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