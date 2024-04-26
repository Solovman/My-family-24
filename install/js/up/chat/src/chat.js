import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";

export class Chat
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Chat: options.rootNodeId required');
		}
		this.rootNode = document.getElementById(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Chat: element with id "${this.rootNodeId}" not found`);
		}

		this.listChats = [];

		this.reload();
	}

	reload()
	{
		Requests.getChats().then(list => {
			this.listChats = list;
			this.render();
		});
	}

	render()
	{
		const currentUserId = BX.message('USER_ID');

		console.log(typeof currentUserId);

		console.log(this.listChats);

		this.listChats.forEach(chat => {
			const chats = Tag.render`
				<div class="message is-info">
					<div class="message-header" style="background-color: #00ceaa">
						<p>${Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName)}</p>
						<button class="delete" aria-label="delete"></button>
					</div>
					<div class="message-body">
						<a class="message-link" href="/chat/${chat.id}/">Перейти к чату</a>
					</div>
				</div>
			`;

			BX.append(chats, this.rootNode);
		})
	}
}
