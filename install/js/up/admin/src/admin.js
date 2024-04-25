import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";
import {SubscriptionTable} from "./table/subscriptionTable.js";
import {PurchaseTable} from "./table/purchaseTable.js";
import {UserSubscriptionsTable} from "./table/userSubscriptionsTable.js";
import {UserPurchaseTable} from "./table/userPurchaseTable.js";
import {Form} from "./form/subscriptions/form";
import {FormPurchase} from "./form/purchase/form";
import {FormUserSub} from "./form/userSubscription/form.js";

export class Admin
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Table: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Table: element with id "${this.rootNodeId}" not found`);
		}

		this.listSub = [];
		this.listPurchase = [];
		this.listUserSubscriptions = [];
		this.listUserPurchase = [];

		this.loadListSub();

		this.setEvents();
	}

	loadListSub() {
		Requests.getListSubscription().then(list => {
			this.rootNode.innerHTML = '';
			this.listSub = list;

			const btns = document.querySelectorAll('.admin__btn');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('sub'), 'btn-active');

			BX.append(SubscriptionTable.render(list), this.rootNode);

			const btnEdit = document.querySelectorAll('.edit');
			const btnDeactivation = document.querySelectorAll('.deactivation');
			const btnActivation = document.querySelectorAll('.activation');
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

			BX.append(PurchaseTable.render(list), this.rootNode);

			const btns = document.querySelectorAll('.admin__btn');

			const btnRemove = document.querySelectorAll('.remove');

			const btnAdd = BX('add');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('purchase'), 'btn-active');

			btnRemove.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const id = event.target.dataset.btnId;
					console.log(id)

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

			BX.bind(btnAdd, 'click', () => {
				FormPurchase.render();
				BX.bind(BX('action-button'), 'click', (event) => {

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

			BX.append(UserPurchaseTable.render(list), this.rootNode);

			const btns = document.querySelectorAll('.admin__btn');

			const btnRemove = document.querySelectorAll('.remove__user_purchase');
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

		})
	}

	setEvents()
	{
		const btnSub = BX('sub');
		const btnPurchase = BX('purchase');
		const btnUserSub = BX('userSub');
		const btnUserPurchase = BX('userPurchase');

		BX.bind(btnSub, 'click', () => {
			this.loadListSub();
		});

		BX.bind(btnPurchase, 'click', () => {
			this.loadListPurchase();
		});

		BX.bind(btnUserSub, 'click', () => {
			this.loadListUserSubscriptions();
		});

		BX.bind(btnUserPurchase, 'click', () => {
			this.loadListUserPurchase();
		});
	}
}
