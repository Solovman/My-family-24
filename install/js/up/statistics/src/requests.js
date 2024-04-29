export class Requests
{
	static getGenderCountByTreeId(treeId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.statistics.getGenderCountByTreeId', {
				data: {
					treeId: treeId
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

	static getHeightsByTreeId(treeId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.statistics.getHeightsByTreeId', {
				data: {
					treeId: treeId
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

	static getWeightByTreeId(treeId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.statistics.getWeightByTreeId', {
				data: {
					treeId: treeId
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

	static getAgesByTreeId(treeId)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.statistics.getAgesByTreeId', {
				data: {
					treeId: treeId
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

	static  getTreesByUserId()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.statistics.getTreesByUserId')
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