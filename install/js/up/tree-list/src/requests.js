export class Requests
{
	static updateSecuritySearchStatus(id, securityStatus)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.trees.updateSecuritySearchStatus', {
				data: {
					id: id,
					securityStatus: securityStatus
				}
			})
				.then((response) => {
					resolve(response.data);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}
}