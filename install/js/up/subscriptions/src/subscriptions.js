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
				Form.render();
			});
		})
	}
}
