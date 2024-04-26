export class Requests
{
	static getChats()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.chatRelatives.getChats')
				.then((response) => {
					const listChats = response.data.listChats;

					resolve(listChats);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}
}