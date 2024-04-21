import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";

export class Account
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Account: options.rootNodeId required');
		}

		this.rootNode = BX(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Account: element with id "${this.rootNodeId}" not found`);
		}

		this.nodeList = [];

		this.reload();
	}


	reload()
	{
		Requests.getInformation().then(data => {
			this.nodeList = data;

			this.render()
		})
	}

	render()
	{
		const data = Tag.render`
			<div class="profile-container">
				<img src="/local/modules/up.tree/images/user_default.png" alt="Фото профиля">
				<h2 class="profile-heading font-account">${BX.util.htmlspecialchars(this.nodeList[1].name) + ' ' + BX.util.htmlspecialchars(this.nodeList[1].surname)}</h2>
				<div class="font-account">Уровень подписки: ${this.nodeList[0]}</div>
			</div>
		`;

		this.rootNode.append(data);
	}
}
