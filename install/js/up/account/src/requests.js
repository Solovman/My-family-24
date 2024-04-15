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
}