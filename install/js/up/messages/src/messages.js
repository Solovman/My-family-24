import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";


export class Messages
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Messages: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Messages: element with id "${this.rootNodeId}" not found`);
		}

		this.listChats = [];

		this.reload();
		this.setEvents();
	}

	reload()
	{

		const chatId = parseInt(window.location.href.match(/\d+/));
		Requests.getMessages(Number(chatId)).then(list => {
			this.listMessages = list;
			this.render();
		});
	}

	setEvents()
	{
		const formSend = BX('formSend');
		const chatId = parseInt(window.location.href.match(/\d+/));

		BX.bind(formSend, 'submit', (event) => {
			event.preventDefault();

			const message = BX('message').value;


			Requests.addMessages(Number(chatId), message).then(result => {
				this.reload()
			});
		})
	}

	render()
	{
		this.rootNode.innerHTML = '';
		const currentUserId = BX.message('USER_ID');

		console.log(this.listMessages);

		let onUpdateNodeAdded = false;

		this.listMessages.forEach(message => {

			const direction = Number(currentUserId) !== message.authorId ? 'is-align-items-start' : 'is-align-items-end';

			const bodyColor = Number(currentUserId) !== message.authorId ? '#DCF8C6' : '#f1f1f1';

			const messages = Tag.render`
							<div class="message-info is-flex is-flex-direction-column is-align-items-start ${direction}" style="margin-bottom: 20px !important;">
								<div class="message-header" style="background-color: #00ceaa; width: 25%;" >
									<p><strong>${message.authorName}:</strong></p>
										<p>${message.createdAt}</p>
								</div>
								<div class="message-body" style="background-color: ${bodyColor}; width: 25%;;">
									${message.message}
								</div>
							</div>

			`;

			BX.append(messages, this.rootNode);

		})
	}

}
