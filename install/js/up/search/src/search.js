import {Tag, Type} from 'main.core';
import {Requests} from "./requests.js";
import {Form} from "./form.js";

export class Search
{
	constructor(options = {})
	{
		if(Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Search: options.rootNodeId required');
		}

		if(Type.isStringFilled(options.rootSearchId))
		{
			this.rootSearchId = options.rootSearchId;
		}
		else
		{
			throw new Error('Search: options.rootSearch required');
		}

		this.rootNode = document.getElementById(this.rootNodeId);
		this.rootSearch = document.getElementById(this.rootSearchId);

		if (!this.rootNode)
		{
			throw new Error(`Search: element with id "${this.rootNodeId}" not found`);
		}

		if (!this.rootSearch)
		{
			throw new Error(`Search: element with id "${this.rootSearch}" not found`);
		}

		this.trees = [];
		this.usersPersons = [];

		this.loadTrees();
	}


	loadTrees() {
		Requests.getListTrees().then((list) => {
			this.trees = list;

			this.renderSelect();

			this.setEvents();
		})
	}

	setEvents()
	{
		const btnSearch = BX('search-relatives');

		BX.bind(btnSearch, 'click', (event) => {
			let treeId;
			const selectBoxInput = document.querySelectorAll('.select-box__input-text');

			selectBoxInput.forEach(input => {
				const displayStyle = window.getComputedStyle(input).display;
				if (displayStyle === 'block') {
					treeId = parseInt(input.id.match(/\d+/));
				}
			})

			const spinner = Tag.render`
						<div id="spinner" class="search__spinner spinner-grow text-primary" role="status">
							<span class="visually-hidden">Loading...</span>
						</div>
					`;

			BX.append(spinner, this.rootNode);

			Requests.getUsersPersons(treeId).then(result => {
				this.usersPersons = result;

				this.renderListUser();
			})
		});
	}

	renderSelect()
	{
		const select = Tag.render`
		<div class="select-box">
			<div class="select-container">
				<div class="select-box__current" tabindex="1">
					${this.trees.map(item => `
						<div class="select-box__value">
							<input class="select-box__input" type="radio" id="${item.id}" value="${item.id}" name="trees" checked="checked"/>
							<p id="tree${item.id}" class="select-box__input-text">${item.title}</p>
						</div>
					`).join('')}
				
					<img class="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" aria-hidden="true"/>
				</div>
				<ul class="select-box__list">
					${this.trees.map(item => `
						<li>
							<label class="select-box__option" for="${item.id}" aria-hidden="aria-hidden">${item.title}</label>
						</li>
					 `).join('')}
				</ul>
			</div>
			<button id="search-relatives" class="search__btn">Поиск</button>
		</div>`

		const textInfo = Tag.render`
		<h2 class="search__heading">Выберите дерево, по которому хотите сделать поиск</h2>
		`;

		BX.append(textInfo, this.rootNode);

		BX.append(select, this.rootNode);
	}

	renderListUser()
	{
		this.rootSearch.innerHTML = '';

		if (this.usersPersons.foundUsers) {
			const processUsers = async () => {
				const usersWithChats = [];
				for (const user of this.usersPersons.foundUsers) {
					const chatExists = await this.searchChatByRecipientId(user.ID);
					usersWithChats.push({ user, chatExists });
				}
				return usersWithChats;
			};

			processUsers().then(usersWithChats => {
				const list = Tag.render`
					  <main class="leaderboard__profiles">
						${usersWithChats.map(({ user, chatExists }) => `
						  <article class="leaderboard__profile">
							<img src="/local/modules/up.tree/images/tree-account.png" alt="user" class="leaderboard__picture">
							<span class="leaderboard__name">
								<span>User: ${BX.util.htmlspecialchars(user.NAME) + ' ' + BX.util.htmlspecialchars(user.LAST_NAME)}</span>
							 	 <span class="leaderboard__persons">
									<span class="heading-persons">Found relatives:</span>
										${this.usersPersons.foundPersons.filter(person => person.userId === Number(user.ID)).map(person => `
										  <p class="persons-info">${person.name + ' ' + person.surname};</p>
										`).join('')}
								</span>
							</span>
					
							<div data-user-check = "${user.ID}" class="notice-container">
								${chatExists ? `Сообщение отправлено` : `
									<span data-user-id = "${user.ID}" data-user-name = "${user.NAME}" data-user-surname = "${user.LAST_NAME}" class="notice leaderboard__value">
										<svg data-user-id = "${user.ID}" data-user-name = "${user.NAME}" data-user-surname = "${user.LAST_NAME}" width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path data-user-id = "${user.ID}" data-user-name = "${user.NAME}" data-user-surname = "${user.LAST_NAME}" d="M11.713 7.14977C12.1271 7.13953 12.4545 6.79555 12.4443 6.38146C12.434 5.96738 12.0901 5.63999 11.676 5.65023L11.713 7.14977ZM6.30665 12.193H7.05665C7.05665 12.1874 7.05659 12.1818 7.05646 12.1761L6.30665 12.193ZM6.30665 14.51L6.34575 15.259C6.74423 15.2382 7.05665 14.909 7.05665 14.51H6.30665ZM6.30665 17.6L6.26755 18.349C6.28057 18.3497 6.29361 18.35 6.30665 18.35L6.30665 17.6ZM9.41983 18.35C9.83404 18.35 10.1698 18.0142 10.1698 17.6C10.1698 17.1858 9.83404 16.85 9.41983 16.85V18.35ZM10.9445 6.4C10.9445 6.81421 11.2803 7.15 11.6945 7.15C12.1087 7.15 12.4445 6.81421 12.4445 6.4H10.9445ZM12.4445 4C12.4445 3.58579 12.1087 3.25 11.6945 3.25C11.2803 3.25 10.9445 3.58579 10.9445 4H12.4445ZM11.713 5.65023C11.299 5.63999 10.955 5.96738 10.9447 6.38146C10.9345 6.79555 11.2619 7.13953 11.676 7.14977L11.713 5.65023ZM17.0824 12.193L16.3325 12.1761C16.3324 12.1818 16.3324 12.1874 16.3324 12.193H17.0824ZM17.0824 14.51H16.3324C16.3324 14.909 16.6448 15.2382 17.0433 15.259L17.0824 14.51ZM17.0824 17.6V18.35C17.0954 18.35 17.1084 18.3497 17.1215 18.349L17.0824 17.6ZM13.9692 16.85C13.555 16.85 13.2192 17.1858 13.2192 17.6C13.2192 18.0142 13.555 18.35 13.9692 18.35V16.85ZM10.1688 17.6027C10.1703 17.1885 9.83574 16.8515 9.42153 16.85C9.00732 16.8485 8.67034 17.1831 8.66886 17.5973L10.1688 17.6027ZM10.0848 19.3L10.6322 18.7873L10.6309 18.786L10.0848 19.3ZM13.3023 19.3L12.7561 18.786L12.7549 18.7873L13.3023 19.3ZM14.7182 17.5973C14.7167 17.1831 14.3797 16.8485 13.9655 16.85C13.5513 16.8515 13.2167 17.1885 13.2182 17.6027L14.7182 17.5973ZM9.41788 16.85C9.00366 16.85 8.66788 17.1858 8.66788 17.6C8.66788 18.0142 9.00366 18.35 9.41788 18.35V16.85ZM13.9692 18.35C14.3834 18.35 14.7192 18.0142 14.7192 17.6C14.7192 17.1858 14.3834 16.85 13.9692 16.85V18.35ZM11.676 5.65023C8.198 5.73622 5.47765 8.68931 5.55684 12.2099L7.05646 12.1761C6.99506 9.44664 9.09735 7.21444 11.713 7.14977L11.676 5.65023ZM5.55665 12.193V14.51H7.05665V12.193H5.55665ZM6.26755 13.761C5.0505 13.8246 4.125 14.8488 4.125 16.055H5.625C5.625 15.6136 5.95844 15.2792 6.34575 15.259L6.26755 13.761ZM4.125 16.055C4.125 17.2612 5.0505 18.2854 6.26755 18.349L6.34575 16.851C5.95843 16.8308 5.625 16.4964 5.625 16.055H4.125ZM6.30665 18.35H9.41983V16.85H6.30665V18.35ZM12.4445 6.4V4H10.9445V6.4H12.4445ZM11.676 7.14977C14.2917 7.21444 16.3939 9.44664 16.3325 12.1761L17.8322 12.2099C17.9114 8.68931 15.191 5.73622 11.713 5.65023L11.676 7.14977ZM16.3324 12.193V14.51H17.8324V12.193H16.3324ZM17.0433 15.259C17.4306 15.2792 17.764 15.6136 17.764 16.055H19.264C19.264 14.8488 18.3385 13.8246 17.1215 13.761L17.0433 15.259ZM17.764 16.055C17.764 16.4964 17.4306 16.8308 17.0433 16.851L17.1215 18.349C18.3385 18.2854 19.264 17.2612 19.264 16.055H17.764ZM17.0824 16.85H13.9692V18.35H17.0824V16.85ZM8.66886 17.5973C8.66592 18.4207 8.976 19.2162 9.53861 19.814L10.6309 18.786C10.335 18.4715 10.1673 18.0473 10.1688 17.6027L8.66886 17.5973ZM9.53739 19.8127C10.0977 20.4109 10.8758 20.7529 11.6935 20.7529V19.2529C11.2969 19.2529 10.9132 19.0873 10.6322 18.7873L9.53739 19.8127ZM11.6935 20.7529C12.5113 20.7529 13.2894 20.4109 13.8497 19.8127L12.7549 18.7873C12.4739 19.0873 12.0901 19.2529 11.6935 19.2529V20.7529ZM13.8484 19.814C14.4111 19.2162 14.7211 18.4207 14.7182 17.5973L13.2182 17.6027C13.2198 18.0473 13.0521 18.4715 12.7561 18.786L13.8484 19.814ZM9.41788 18.35H13.9692V16.85H9.41788V18.35Z" fill="#00ceaa"/>
										</svg>
									</span>
								`}
							</div>
						  </article>
						`).join('')}
					  </main>
					`;
				BX.append(list, this.rootSearch);

				BX('spinner').remove();

				const btnNotice = document.querySelectorAll('.notice');

				btnNotice.forEach(btn => {
					BX.bind(btn, 'click', (event) => {
						const id = event.target.dataset.userId;
						const name = event.target.dataset.userName;
						const surname = event.target.dataset.userSurname;

						Form.render(id, name, surname);
					})
				})
			});

		} else {
			const notFound = Tag.render`
				<div class="notFound">
					<span class="notFound-icon">
						<svg fill="#00ceaa" width="80px" height="80px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<g>
								<path d="M7.29,12H6.87A5.73,5.73,0,0,0,1,17.54,2.38,2.38,0,0,0,1,18H8.26A7,7,0,0,1,7,14,7.27,7.27,0,0,1,7.29,12ZM8.46,9.73A7,7,0,0,1,14,7a5.12,5.12,0,0,1,.56,0A4.93,4.93,0,0,0,15,5,5,5,0,1,0,8.46,9.73Z"/>
								<path class="secondary" d="M14,8a6,6,0,1,0,6,6A6,6,0,0,0,14,8Zm0,10.8A4.8,4.8,0,1,1,18.8,14,4.8,4.8,0,0,1,14,18.8ZM17,12l-1-1-2,2-2-2-1,1,2,2-2,2,1,1,2-2,2,2,1-1-2-2Z"/>
							</g>
						
						</svg>
					</span>
					<p class="notFound-text">Возможные родственники не найдены</p>
				</div>
			`;

			BX.append(notFound, this.rootSearch);
			BX('spinner').remove();
		}
	}

	async searchChatByRecipientId(recipientId) {
		try {
			return await Requests.searchChatByRecipientId(recipientId);
		} catch (error) {
			console.error('Error searching chat:', error);
		}
	}
}
