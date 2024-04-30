import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";
import {SubscriptionTable} from "./table/subscriptionTable.js";
import {PurchaseTable} from "./table/purchaseTable.js";
import {UserSubscriptionsTable} from "./table/userSubscriptionsTable.js";
import {UserPurchaseTable} from "./table/userPurchaseTable.js";
import {Form} from "./form/subscriptions/form";
import {FormPurchase} from "./form/purchase/form";
import {FormUserPurchase} from "./form/userPurchase/form";
import {FormUserSub} from "./form/userSubscription/form.js";
import {UsersTable} from "./table/usersTable";

export class Admin {
	constructor(options = {}) {
		v
		if (Type.isStringFilled(options.rootNodeId)) {
			this.rootNodeId = options.rootNodeId;
		} else {
			throw new Error('Table: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode) {
			throw new Error(`Table: element with id "${this.rootNodeId}" not found`);
		}

		this.listSub = [];
		this.listPurchase = [];
		this.listUserSubscriptions = [];
		this.listUserPurchase = [];
		this.listUsers = [];

		switch (localStorage.getItem('tab')) {
			case 'sub':
				this.loadListSub();
				break;
			case 'purchase':
				this.loadListPurchase();
				break;
			case 'userSub':
				this.loadListUserSubscriptions();
				break;
			case 'userPurchase':
				this.loadListUserPurchase();
				break;
			case 'user':
				this.loadListUsers();
				break;
			default:
				this.loadListUsers();
		}

		this.setEvents();
	}

	loadListUsers() {
		Requests.getListUser().then(list => {
			this.rootNode.innerHTML = '';
			this.listUsers = list;

			BX('add').style.display = 'none';

			const btns = document.querySelectorAll('.admin__btn');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('users'), 'btn-active');

			BX.append(UsersTable.render(this.listUsers), this.rootNode);

			const checkbox = document.querySelectorAll('.input-checkbox');

			checkbox.forEach(el => {
				BX.bind(el, 'click', (event) => {
					const id = event.target.dataset.btnId;

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					if (!el.checked) {
						Requests.deactivationUser(Number(id), 'N').then(result => {
							this.loadListUsers();
						});
					} else {
						Requests.deactivationUser(Number(id), 'Y').then(result => {
							this.loadListUsers();
						});
					}

				})
			})
		})
	}

	loadListSub(page= 1) {
		Requests.getListSubscription(page).then(list => {
			this.rootNode.innerHTML = '';
			this.listSub = list;

			BX('add').style.display = 'inline-block';

			const btns = document.querySelectorAll('.admin__btn');
			const paginationBtn = Tag.render`
				<div class="pagination-container">
					<button class="pagination-btn">1</button>
					<button class="pagination-btn">2</button>
				</div>
			`;

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('sub'), 'btn-active');

			BX.append(SubscriptionTable.render(list), this.rootNode);
			BX.append(paginationBtn, this.rootNode);

			document.querySelectorAll('.pagination-btn').forEach(btn => {
				BX.bind(btn, 'click', () => {
					this.loadListSub(Number(btn.textContent));
				})
			})

			const btnEdit = document.querySelectorAll('.edit');
			const btnAdd = BX('add');

			BX.bind(btnAdd, 'click', () => {
				Form.render();
				BX.bind(BX('edit-button'), 'click', (event) => {

					event.preventDefault();

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					const subscription = {
						level: BX('name').value,
						price: Number(BX('price').value),
						numberTrees: Number(BX('numberTrees').value),
						numberNodes: Number(BX('numberNodes').value),
						customization:  Number(BX('customization-select').value)
					};

					Requests.addSubscription(subscription).then(result => {
						this.loadListSub();
						document.querySelector('.popup-window').remove();
						document.querySelector('.popup-window-overlay').remove();
					});
				});
			});

			btnEdit.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const el = event.target;
					const data = this.listSub.find(item => item.id === Number(el.dataset.btnId));
					Form.render(data);
				});
			})

			const checkbox = document.querySelectorAll('.input-checkbox');

			checkbox.forEach(el => {
				BX.bind(el, 'click', (event) => {
					const id = event.target.dataset.btnId;

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					if (!el.checked) {
						Requests.deactivationSubscription(Number(id), 0).then(result => {

							this.loadListSub();
						});
					} else {
						Requests.deactivationSubscription(Number(id), 1).then(result => {
							this.loadListSub();
						});
					}

				})
			})

		})
	}

	loadListPurchase() {
		Requests.getListPurchase().then(list => {
			this.rootNode.innerHTML = '';

			this.listPurchase = list;

			BX('add').style.display = 'inline-block';

			BX.append(PurchaseTable.render(list), this.rootNode);

			const btns = document.querySelectorAll('.admin__btn');

			const btnRemove = document.querySelectorAll('.remove');

			const btnEdit = document.querySelectorAll('.edit');

			const btnAdd = BX('add');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('purchase'), 'btn-active');

			btnRemove.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const id = event.target.dataset.btnId;

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					Requests.removePurchase(Number(id)).then(result => {
						this.loadListPurchase();
					});
				});
			})

			btnEdit.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const el = event.target;

					const data = this.listPurchase.find(item => Number(item.ID) === Number(el.dataset.btnId));
					FormPurchase.render(data);
				});
			})

			BX.bind(btnAdd, 'click', () => {
				FormPurchase.render();
				BX.bind(BX('edit-button'), 'click', (event) => {

					event.preventDefault();

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					const purchase = {
						title: BX('title').value,
						price: Number(BX('price').value),
					};

					Requests.addPurchase(purchase).then(result => {
						this.loadListPurchase();
						document.querySelector('.popup-window').remove();
						document.querySelector('.popup-window-overlay').remove();
					});
				});
			});


		})
	}

	loadListUserSubscriptions() {
		Requests.getListUserSubscriptions().then(list => {
			this.listUserSubscriptions = list;

			BX('add').style.display = 'none';

			const btns = document.querySelectorAll('.admin__btn');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('userSub'), 'btn-active');

			this.rootNode.innerHTML = '';

			BX.append(UserSubscriptionsTable.render(list), this.rootNode);

			const editBtn = document.querySelectorAll('.action-list-btn');

			editBtn.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const userId = event.target.dataset.userId;
					const data = this.listUserSubscriptions.find(item => item.userId === Number(userId));
					console.log(data);
					FormUserSub.render(data);
				});
			})
		})
	}

	loadListUserPurchase()
	{
		Requests.getListUserPurchase().then(list => {
			this.rootNode.innerHTML = '';

			this.listPurchase = list;

			BX('add').style.display = 'inline-block';

			BX.append(UserPurchaseTable.render(list), this.rootNode);

			const btns = document.querySelectorAll('.admin__btn');

			const btnRemove = document.querySelectorAll('.remove__user_purchase');

			const btnAdd = BX('add');

			console.log(btnRemove)
			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('userPurchase'), 'btn-active');


			btnRemove.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const purchaseId = event.target.dataset.btnPurchaseId;
					console.log(purchaseId)
					const userId = event.target.dataset.btnUserId;
					console.log(userId)
					console.log(event.target.dataset)

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					Requests.removePurchaseUser(Number(userId), Number(purchaseId)).then(result => {
						this.loadListUserPurchase();
					});
				});
			})

			BX.bind(btnAdd, 'click', () => {
				FormUserPurchase.render(list);
				BX.bind(BX('action-button'), 'click', (event) => {

					event.preventDefault();

					const spinner = Tag.render`
						<div class="admin__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

					BX.append(spinner, this.rootNode);

					const userId = Number(BX('userId').value);
					const purchaseId = Number(BX('purchaseId').value);

					Requests.addPurchaseUser(userId, purchaseId).then(result => {
						this.loadListUserPurchase();
						document.querySelector('.popup-window').remove();
						document.querySelector('.popup-window-overlay').remove();
					});
				});
			});

		})
	}

	setEvents()
	{
		const btnSub = BX('sub');
		const btnPurchase = BX('purchase');
		const btnUserSub = BX('userSub');
		const btnUserPurchase = BX('userPurchase');
		const btnUser = BX('users');

		BX.bind(btnSub, 'click', () => {
			localStorage.setItem('tab', 'sub');
			this.loadListSub();
		});

		BX.bind(btnPurchase, 'click', () => {
			localStorage.setItem('tab', 'purchase');
			this.loadListPurchase();
		});

		BX.bind(btnUserSub, 'click', () => {
			localStorage.setItem('tab', 'userSub');
			this.loadListUserSubscriptions();
		});

		BX.bind(btnUserPurchase, 'click', () => {
			localStorage.setItem('tab', 'userPurchase');
			this.loadListUserPurchase();
		});

		BX.bind(btnUser, 'click', () => {
			localStorage.setItem('tab', 'user');
			this.loadListUsers();
		});
	}
}
