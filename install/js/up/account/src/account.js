import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";
import {Window} from "./ModalWindow/window.js";

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

	setEvents() {
		const btnOpenMenu = BX('open-menu-icon');

		BX.bind(btnOpenMenu, 'click', () => {
			Requests.getAvatars().then(list => {
				Window.render(list);
			})
		})
	}

	render()
	{
		Requests.getUserFileName().then(file => {
			this.rootNode.innerHTML = '';

			const data = Tag.render`
			<div class="profile-container">
				<div class="image">
					<img data-id-file="${file.ID}" id="user-icon" src="${file.FILE_NAME}" alt="Фото профиля">
					<div class="caption">
						<button id="open-menu-icon" class="lupa">
							<svg height="50px" width="50px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
								viewBox="0 0 512 512"  xml:space="preserve">
								<style type="text/css">
									.st0{fill:#fff;}
								</style>
								<g>
									<path class="st0" d="M84.523,84.523V512H512V84.523H84.523z M220.739,184.766c24.028,0,43.5,19.48,43.5,43.507
										c0,24.027-19.473,43.507-43.5,43.507c-24.027,0-43.507-19.48-43.507-43.507C177.232,204.246,196.712,184.766,220.739,184.766z
										M463.923,407.239c-1.494,2.776-4.398,4.517-7.556,4.517H140.156c-3.151,0-6.048-1.726-7.548-4.502
										c-1.501-2.777-1.359-6.153,0.375-8.787l55.311-84.276c3.669-5.59,9.732-9.154,16.403-9.627c6.679-0.472,13.185,2.192,17.612,7.212
										l38.15,43.236l69.125-105.196c3.962-6.026,10.693-9.665,17.904-9.672c7.211-0.008,13.95,3.617,17.92,9.635l98.127,148.666
										C465.273,401.086,465.424,404.463,463.923,407.239z"/>
									<polygon class="st0" points="450.529,0 0,0 0,450.529 46.104,450.529 46.104,46.104 450.529,46.104 \t"/>
								</g>
							</svg>
						</button>
					</div>
				</div>
				<h2 class="profile-heading font-account">${BX.util.htmlspecialchars(this.nodeList[1].name) + ' ' + BX.util.htmlspecialchars(this.nodeList[1].surname)}</h2>
				<div class="font-account">${BX.message('UP_ACCOUNT_LEVEL_SUBSCRIPTION')} ${BX.util.htmlspecialchars(this.nodeList[0])}</div>
			</div>
		`;

			this.rootNode.append(data);

			this.setEvents();
		})

	}
}
