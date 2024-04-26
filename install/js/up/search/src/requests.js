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

	static addMessages(recipientId, message)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.chatRelatives.addMessages', {
					data: {
						recipientId: recipientId,
						message: message
					}
				})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static searchChatByRecipientId(recipientId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.chatRelatives.searchChatByRecipientId', {
				data: {
					recipientId: recipientId,
				}
			})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}