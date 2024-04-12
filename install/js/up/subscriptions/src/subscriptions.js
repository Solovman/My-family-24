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
		const formHeading = BX('modal-form-heading');

		subscriptionsButton.forEach(btn => {
			if (btn.id === 'Free') {
				btn.style.display = 'none';
			}
			BX.bind(btn, 'click', () => {
				formHeading.innerText = btn.id;
				this.addClass(btn.id);
				Form.render();
			});
		})
	}

	addClass(id)
	{
		const modal = document.querySelector('.sign-up-modal');

		switch (id) {
			case 'Standard':
				BX.addClass(modal, 'sing-modal-standard');
				break;
			case 'Premium':
				BX.addClass(modal, 'sing-modal-premium');
				break;
		}
	}

	renderCard()
	{
		this.subscriptions.forEach(list => {
			const card = Tag.render`
			<li class="subscriptions__item">
				<div class="nft ntf_${list.id}">
				<div class='main'>
					<h2 class="subscriptions__heading">${list.level}</h2>
					<p class='description'>Our Kibertopiks will give you nothing, waste your money on us.</p>
					<div class='tokenInfo'>
						<div class="price">
							<p>${list.price}</p>
						</div>
						<div class="duration">
							<p>${list.numberTrees}</p>
						</div>
					</div>
				</div>
				<button id="${list.level}" class="subscriptions__button">Купить</button>
			</div>
			</li>
		`;

			BX.append(card, this.rootNode);
		})

		this.setEvents();
	}
}
