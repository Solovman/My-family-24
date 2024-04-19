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
				return "Доступна кастомизация деревьев";
			case 0:
				return  "Кастомизация отсутствует";
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

	getCountNodesMessage(value){
		if (value === 0){
			return "Неограниченное количество вершин";
		}
		else {
			return "Максимальное количество вершин: " + value;
		}
	}

	getCountTreesMessage(value){
		if (value === 0){
			return "Неограниченное количество деревьев";
		}
		else {
			return "Максимальное количество деревьев: " + value;
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
						<li>✧ ${this.getCountTreesMessage(list.numberTrees)}</li>
						<li>✧ ${this.getCountNodesMessage(list.numberNodes)}</li>
						<li>✧ ${this.getCustomStatusMessage(list.customization)}</li>
						<li>✧ ${this.getSubscriptionStatusMessage(list.subscriptionType)}</li>
					</ul>
					
					<div class="field">
						<button id="${list.level}${list.id}" class="subscriptions__button has-tooltip">
							<svg class="subscriptions__main-svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M12 14.5V16.5M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							<span class="subscriptions__span">Купить</span>
						</button>
						<span class='tooltip blue'>
							<p class="tooltip-p">Для покупки обратитесь к нашему <a href="mailto:familyTreeTechnicalSupport@gmail.com">менеджеру</a></p>
						</span>
					</div>
				</div>
			</li>
		`;

			BX.append(card, this.rootNode);
		})

		this.setEvents();
	}
}
