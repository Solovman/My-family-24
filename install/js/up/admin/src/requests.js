export class Requests
{
	static getListSubscription() {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.getListSubscription', {
					navigation: {
						page: 3
					}
				})
				.then((response) => {
					const listSubscription = response.data.listSubscription;

					resolve(listSubscription);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}

	static getListPurchase() {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.getListPurchase')
				.then((response) => {
					const listPurchase = response.data.listPurchase;

					resolve(listPurchase);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}

	static getListUserSubscriptions() {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.getListUserSubscription')
				.then((response) => {
					const listUserSubscriptions = response.data.listUserSubscriptions;

					resolve(listUserSubscriptions);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}

	static getListUser()
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.getListUser')
				.then((response) => {
					const listUser = response.data.listUser;

					resolve(listUser);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}

	static deactivationUser(userId, active)
	{
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.deactivationUser', {
				data: {
					userId: userId,
					active: active
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

	static updateUserSubscription(newUserSubscription) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.updateUserSubscription', {
					data: {
						newUserSubscription: newUserSubscription
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

	static getListUserPurchase() {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.getListUserPurchase')
				.then((response) => {
					const listUserPurchase = response.data.listUserPurchase;

					resolve(listUserPurchase);
				})
				.catch((error) => {
					reject(error);
				})
			;
		});
	}

	static deactivationSubscription(id, active) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.deactivationSubscription', {
				data: {
					id: id,
					active: active
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

	static removePurchase(purchaseId) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.removePurchase', {
					data: {
						purchaseId: purchaseId
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
	static removePurchaseUser(userId, purchaseId) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.removePurchaseUserRelation', {
					data: {
						userId: userId,
						purchaseId: purchaseId
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

	static updateSubscription(newSubscription) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.updateSubscription', {
					data: {
						newSubscription: newSubscription
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

	static updatePurchase(newPurchase) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.updatePurchase', {
					data: {
						newPurchase: newPurchase
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

	static addSubscription(subscription) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.addSubscription', {
					data: {
						subscription: subscription
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

	static addPurchase(purchase) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.addPurchase', {
					data: {
						purchase: purchase
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

	static addPurchaseUser(userId, purchaseId) {
		return new Promise((resolve, reject) => {
			BX.ajax.runAction('up:tree.admin.addPurchaseUserRelation', {
					data: {
						userId: userId,
						purchaseId: purchaseId
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