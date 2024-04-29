import {Tag} from 'main.core';
export class UsersTable
{
	static render(data)
	{
		const headingTable = Tag.render`
			<li class="table-header">
				<div class="table-head col col-1">ID</div>
				<div class="table-head col col-1">${BX.message('UP_TREE_ADMIN_EMAIL')}</div>
				<div class="table-head col col-1">${BX.message('UP_TREE_ADMIN_NAME')}</div>
				<div class="table-head col col-1">${BX.message('UP_TREE_ADMIN_SURNAME')}</div>
				<div class="table-head col col-1">${BX.message('UP_TREE_ADMIN_STATUS')}</div>
				<div class="table-head col col-1">${BX.message('UP_TREE_ADMIN_ACTIONS')}</div>
			</li>
		`;

		const dataUsers = this.renderList(data);

		const table =  Tag.render`
			<ul class="responsive-table"></ul>
		`;

		BX.append(headingTable, table);

		dataUsers.forEach(el => {
			BX.append(el, table);
		})

		return table;
	}

	static renderList(data) {
		return data.map(user => {
			return Tag.render`
				<li class="table-row">
					<div class="col col-1" data-label="Id">${user.id}</div>
					<div class="col col-1" data-label="Title">${BX.util.htmlspecialchars(user.login)}</div>
					<div class="col col-1" data-label="Price">${BX.util.htmlspecialchars(user.name)}</div>
					<div class="col col-1" data-label="Price">${BX.util.htmlspecialchars(user.lastName)}</div>
					<div class="col col-1" data-label="Price">${user.active ? 'Активен' : 'Неактивен'}</div>
					<div class="col col-1">
					<ul class="action-list">
							<li class="action-item">
								<label class="checkbox">
									<input class="input-checkbox" data-btn-id="${user.id}" ${user.active ? "checked" : ''} type="checkbox" />
									<svg viewBox="0 0 21 18">
										<symbol id="tick-path${user.id}" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
											<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
										</symbol>
										<defs>
											<mask id="tick${user.id}">
												<use class="tick mask" href="#tick-path${user.id}" />
											</mask>
										</defs>
										<use class="tick" href="#tick-path${user.id}" stroke="currentColor" />
										<path fill="white" mask="url(#tick${user.id})" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
									</svg>
									<svg class="lines" viewBox="0 0 11 11">
										<path d="M5.88086 5.89441L9.53504 4.26746" />
										<path d="M5.5274 8.78838L9.45391 9.55161" />
										<path d="M3.49371 4.22065L5.55387 0.79198" />
									</svg>
								</label>
							</li>
						</ul>
					</div>
				</li>
			`;
		});
	}
}