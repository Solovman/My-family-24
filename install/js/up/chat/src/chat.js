import {Tag, Type} from 'main.core';
import {Requests} from "./requests.js";
import {Helper} from "./helper.js";

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

		if(Type.isStringFilled(options.rootMessages))
		{
			this.rootMessages = options.rootMessages;
		}
		else
		{
			throw new Error('Chat: options.rootMessages required');
		}


		this.rootNode = document.getElementById(this.rootNodeId);
		this.messagesContainer = document.getElementById(this.rootMessages);

		if (!this.rootNode)
		{
			throw new Error(`Chat: element with id "${this.rootNodeId}" not found`);
		}

		if (!this.messagesContainer)
		{
			throw new Error(`Chat: element with id "${this.messagesContainer}" not found`);
		}

		this.listChats = [];
		this.listMessages = [];
		this.isHandler = false;

		this.reload();
	}

	reload()
	{
		Requests.getChats().then(list => {
			this.listChats = list;

			this.render();
		});
	}

	loadMessages(dataIdChat)
	{
		Requests.getMessages(dataIdChat).then(result => {
			this.listMessages = result;

			this.renderMessage(dataIdChat);
		})
	}

	render()
	{
		this.listChats.innerHTML = '';

		const sendAboutProblems = Tag.render`
			<button class="send-problem">Сообщить о проблеме</button>
		`;

		const currentUserId = BX.message('USER_ID');

		this.listChats.forEach(chat => {
			const chats = Tag.render `
				<div data-id-chat="${chat.id}" id="chat${chat.id}" class="discussion chat-list">
					<div class="photo" style="background-image: url(/local/modules/up.tree/images/avatars/default.png);"></div>
						<div class="desc-contact">
						<p class="name">${Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName)}</p>
						<p id="lastMassage${chat.id}" class="message"></p>
					</div>
				</div>
			`;

			const btnSend = Tag.render`
			<button type="submit" id="send${chat.id}" class="btn-send">
				<svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.7639 12H10.0556M3 8.00003H5.5M4 12H5.5M4.5 16H5.5M9.96153 12.4896L9.07002 15.4486C8.73252 16.5688 8.56376 17.1289 8.70734 17.4633C8.83199 17.7537 9.08656 17.9681 9.39391 18.0415C9.74792 18.1261 10.2711 17.8645 11.3175 17.3413L19.1378 13.4311C20.059 12.9705 20.5197 12.7402 20.6675 12.4285C20.7961 12.1573 20.7961 11.8427 20.6675 11.5715C20.5197 11.2598 20.059 11.0295 19.1378 10.5689L11.3068 6.65342C10.2633 6.13168 9.74156 5.87081 9.38789 5.95502C9.0808 6.02815 8.82627 6.24198 8.70128 6.53184C8.55731 6.86569 8.72427 7.42461 9.05819 8.54246L9.96261 11.5701C10.0137 11.7411 10.0392 11.8266 10.0493 11.9137C10.0583 11.991 10.0582 12.069 10.049 12.1463C10.0387 12.2334 10.013 12.3188 9.96153 12.4896Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</button>`;

			BX.append(chats, this.rootNode);

			BX.append(sendAboutProblems, this.rootNode);

			Requests.getLastMessage(chat.id).then(result => {
				BX(`lastMassage${chat.id}`).textContent = result;
			})

			let currentTarget = null;

			BX.bind(BX(`chat${chat.id}`), 'click', (event) => {
				this.messagesContainer.innerHTML = '';
				BX('footer-send').innerHTML = '';

				BX('input-message').style.display = 'block';

				const spinner = Tag.render`
				<div id="spinnerChat" class="spinner-grow" role="status">
					<span class="visually-hidden">Loading...</span>
				</div>
				`;

				BX.append(spinner, this.messagesContainer);

				const chatsList = document.querySelectorAll('.chat-list');

				chatsList.forEach(chat => {
					BX.removeClass(chat, 'message-active');
				})

				BX.addClass(BX(`chat${chat.id}`), 'message-active');

				BX.append(btnSend, BX('footer-send'));

				const targetDiv = event.target.closest('div[data-id-chat]');

				if (currentTarget !== targetDiv) {
					this.isHandler = false;
				}

				currentTarget = targetDiv;

				if (targetDiv) {
					const dataIdChat = Number(targetDiv.getAttribute('data-id-chat'));

					const nameUser = BX('name-user');
					nameUser.textContent = Number(currentUserId) === chat.authorId ? BX.util.htmlspecialchars(chat.recipientName) : BX.util.htmlspecialchars(chat.authorName);

					this.loadMessages(dataIdChat);
				}

				if (!this.isHandler)
				{
					this.isHandler = true;
					BX.bind(BX(`send${chat.id}`),'click', (event) => {
						event.preventDefault();
						const textMessage = BX('input-message').value;

						Requests.addMessages(chat.id, textMessage).then(result => {
							BX('input-message').value = '';
							BX(`lastMassage${chat.id}`).textContent = textMessage;
							this.loadMessages(chat.id);
						});
					})
				}
			})
		})
	}

	renderMessage() {
		this.messagesContainer.innerHTML = '';

		const currentUserId = Number(BX.message('USER_ID'));
		this.listMessages.forEach(message => {
			const elMessage = Tag.render`
				${currentUserId === message.authorId
				?
				`<div class="message text-only">
						<div class="response">
							<p class="text">
								<span class="text-message">${BX.util.htmlspecialchars(message.message)}</span> 
								<span class="date-message">${Helper.dateFormat(message.createdAt)}</span> 
							</p
						</div>
					</div>`
				:
				`<div class="message">
					<div class="photo" style="background-image: url(/local/modules/up.tree/images/avatars/default.png);"></div>
					<p class="text">  
							<span class="text-message">${BX.util.htmlspecialchars(message.message)}</span> 
							<span class="date-message">${Helper.dateFormat(message.createdAt)}</span> 
					</p
				</div>`
			}
			`;

			BX.append(elMessage, this.messagesContainer);

			this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
		})
	}
}