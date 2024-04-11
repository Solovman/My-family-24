import {Type} from 'main.core';
import {Form} from "./form.js";

export class Subscriptions
{
	constructor(options = {})
	{
		this.setEvents();

		console.log('test');
	}

	setEvents()
	{
		const subscriptionsButton = document.querySelectorAll('.subscriptions__button');

		subscriptionsButton.forEach(btn => {
			BX.bind(btn, 'click', () => {
				this.addClass(btn.id);
				Form.render();
			});
		})
	}

	addClass(id)
	{
		const modal = document.querySelector('.sign-up-modal');

		switch (id) {
			case 'free':
				BX.addClass(modal, 'sing-modal-free');
				break;
			case 'standard':
				BX.addClass(modal, 'sing-modal-standard');
				break;
			case 'premium':
				BX.addClass(modal, 'sing-modal-premium');
				break;
		}
	}
}
