import {Type} from 'main.core';
import {Requests} from "./requests.js";
import {SubscriptionTable} from "./table/subscriptionTable.js";
import {PurchaseTable} from "./table/purchaseTable.js";
import {UserSubscriptionsTable} from "./table/userSubscriptionsTable.js";
import {UserPurchaseTable} from "./table/userPurchaseTable.js";
import {Form} from "./form/form";

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

		this.setEvents();

		this.listSub = [];
		this.listPurchase = [];
		this.listUserSubscriptions = [];
		this.listUserPurchase = [];

		this.loadListSub();
	}

	loadListSub() {
		Requests.getListSubscription().then(list => {
			this.listSub = list;

			const btns = document.querySelectorAll('.admin__btn');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('sub'), 'btn-active');

			this.rootNode.innerHTML = '';

			BX.append(SubscriptionTable.render(list), this.rootNode);

			const btnEdit = document.querySelectorAll('.edit');
			const btnDeactivation = document.querySelectorAll('.deactivation');
			const btnActivation = document.querySelectorAll('.activation');
			const btnAdd = BX('add');

			BX.bind(btnAdd, 'click', () => {
				Form.render();
				BX.bind(BX('edit-button'), 'click', (event) => {

					event.preventDefault();

					const subscription = {
						level: BX('name').value,
						price: Number(BX('price').value),
						numberTrees: Number(BX('numberTrees').value),
						numberNodes: Number(BX('numberNodes').value),
						customization: Number(BX('customization').value)
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

			btnDeactivation.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const id = event.target.dataset.btnId;

					Requests.deactivationSubscription(Number(id), 0).then(result => {
						this.loadListSub();
					});
				});
			})

			btnActivation.forEach(btn => {
				BX.bind(btn, 'click', (event) => {
					const id = event.target.dataset.btnId;

					Requests.deactivationSubscription(Number(id), 1).then(result => {
						this.loadListSub();
					});
				});
			})

		})
	}

	loadListPurchase() {
		Requests.getListPurchase().then(list => {
			this.listPurchase = list;

			const btns = document.querySelectorAll('.admin__btn');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('purchase'), 'btn-active');

			this.rootNode.innerHTML = '';

			BX.append(PurchaseTable.render(list), this.rootNode);
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
		})
	}

	loadListUserPurchase()
	{
		Requests.getListUserPurchase().then(list => {
			this.listUserPurchase = list;

			const btns = document.querySelectorAll('.admin__btn');

			btns.forEach(btn => {
				BX.removeClass(btn, 'btn-active');
			})

			BX.addClass(BX('userPurchase'), 'btn-active');

			this.rootNode.innerHTML = '';

			BX.append(UserPurchaseTable.render(list), this.rootNode);
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
