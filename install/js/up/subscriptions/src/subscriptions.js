import {Type, Tag} from 'main.core';
import {Form} from "./form.js";
import {Requests} from "./requests.js";

export class Subscriptions
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Subscriptions: options.rootNodeId required');
		}

		this.rootNode = BX(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Subscriptions: element with id "${this.rootNodeId}" not found`);
		}

		this.subscriptions = [];

		this.loadList();
	}

	loadList()
	{
		Requests.loadList().then(list => {
			this.subscriptions = list;
			console.log(this.subscriptions)
			this.renderCard();
		})
	}

	setEvents()
	{
		const subscriptionsButton = document.querySelectorAll('.subscriptions__button');
		const formButton = document.querySelector('.sign-up-button');

		const formHeading = BX('modal-form-heading');

		subscriptionsButton.forEach(btn => {
			if (btn.id === 'Free1') {
				btn.style.display = 'none';
			}

			const heading = btn.id.replace(/[^a-zA-Z]+/g, '');
			const buttonId = btn.id.match( /\d+/g);

			BX.bind(btn, 'click', () => {
				formButton.id = buttonId;
				formHeading.innerText = heading;
				this.addClass(btn.id);
				Form.render();
			});
		})
	}

	addClass(id)
	{
		const modal = document.querySelector('.sign-up-modal');

		switch (id) {
			case 'Standard2':
				BX.addClass(modal, 'sing-modal-standard');
				break;
			case 'Premium3':
				BX.addClass(modal, 'sing-modal-premium');
				break;
		}
	}

	getCustomStatusMessage(customStatus)
	{
		switch (customStatus){
			case 1:
				return "Доступна возможность кастомизации деревьев";
			case 0:
				return  "Возможность кастомизации отсутсвует";
		}
	}
	getSubscriptionStatusMessage(customStatus)
	{
		switch (customStatus){
			case 'purchase':
				return "Купи один раз и пользуйся!";
			case 'subscription':
				return  "Месячная подписка";
			case 'default':
				return  "Доступно сейчас";
	}}

	getCorrectValue(value){
		if (value === 0){
			return "не ограничено";
		}
		else {
			return value;
		}
	}

	getEmojiByTitle(title)
	{
		if (title ==='Premium'){
			return title + "👑";
			}
		else{
			return title;
		}

	}

	renderCard()
	{
		this.subscriptions.forEach(list => {
			const card = Tag.render`
			<li class="subscriptions__item">
				<div class="nft ntf_${list.id}">
				<div class='main'>
					<h2 class="subscriptions__heading">${this.getEmojiByTitle(list.level)}</h2>
					<p class='description'></p>
				</div>
				<ul style="color: white; font-size: 1.4em">
					<li>✧ Цена: ${list.price}$</li>
					<li>✧ Максимальное количество деревьев: ${this.getCorrectValue(list.numberTrees)}</li>
					<li>✧ Максимальное количество вершин: ${this.getCorrectValue(list.numberNodes)}</li>
					<li>✧ ${this.getCustomStatusMessage(list.customization)}</li>
					<li>✧ ${this.getSubscriptionStatusMessage(list.subscriptionType)}</li>
				</ul>
				<button id="${list.level}${list.id}" class="subscriptions__button">Купить</button>
			</div>
			</li>
		`;

			BX.append(card, this.rootNode);
		})

		this.setEvents();
	}
}
