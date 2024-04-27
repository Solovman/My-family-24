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
	static getMessages(chatId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.messages.getMessages', {
				data: {
					chatId: chatId
				}
			}).then((response) => {
				const listMessages = response.data.listMessages;

				resolve(listMessages);
			})
				.catch((error) => {
					reject(error);
				});
		});
	}

	static addMessages(chatId, message)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.messages.addMessage', {
				data: {
					chatId: chatId,
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
}