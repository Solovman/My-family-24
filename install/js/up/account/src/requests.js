export class Requests
{
	static getInformation()
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.account.getUserInfo', {
			}).then((response) => {
				const userInfo = response.data.userInfo;

				resolve(userInfo);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static getAvatars()
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.account.getAvatars', {
			}).then((response) => {
				const avatars = response.data.avatars;

				resolve(avatars);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static updateUserImagesByAvatarId(avatarId)
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.account.updateUserImagesByAvatarId', {
				data: {
					avatarId: avatarId
				}
			}).then((response) => {
				resolve(response.data);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}

	static getUserFileName()
	{
		return new Promise((resolve, reject) =>
		{
			BX.ajax.runAction('up:tree.account.getUserFileName', {

			}).then((response) => {
				resolve(response.data);
			})
				.catch((error) => {
					reject(error);
				})
		})
	}
}