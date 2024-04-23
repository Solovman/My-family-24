export class Requests
{
	static getListTrees()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.search.getUserTrees')
				.then((response) => {
					const trees = response.data.trees;

					resolve(trees);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}

	static getUsersPersons(treeId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.search.getPersonsUsers', {
					data: {
						treeId: treeId
					}
				})
				.then((response) => {
					const infoUsersPersons = response.data.infoUsersPersons;

					resolve(infoUsersPersons);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}
}