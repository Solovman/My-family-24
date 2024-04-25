import {Tag} from 'main.core';
import {Form} from "../form/subscriptions/form";

export class SubscriptionTable
{
	static render(data)
	{
		const headingTable = Tag.render`
			<li class="table-header">
				<div class="table-head col col-1">ID</div>
				<div class="table-head col col-1">Подписка</div>
				<div class="table-head col col-1">Цена</div>
				<div class="table-head col col-1">Кол-во деревьев</div>
				<div class="table-head col col-1">Кол-во вершин</div>
				<div class="table-head col col-1">Кастомизация</div>
				<div class="table-head col col-1">Статус</div>
				<div class="table-head col col-1">Действия</div>
			</li>
		`;

		const dataSub = this.renderList(data);

		const table =  Tag.render`
			<ul id="subList" class="responsive-table"></ul>
		`;

		BX.append(headingTable, table);

		dataSub.forEach(el => {
			BX.append(el, table);
		})

		return table;
	}

	static renderList(data) {
		return data.map(sub => {
			return Tag.render`
				<li class="table-row">
					<div class="col col-1" data-label="id">${BX.util.htmlspecialchars(sub.id)}</div>
					<div class="col col-1" data-label="level">${BX.util.htmlspecialchars(sub.level)}</div>
					<div class="col col-1" data-label="price">${BX.util.htmlspecialchars(sub.price)}</div>
					<div class="col col-1" data-label="numberTrees">${BX.util.htmlspecialchars(sub.numberTrees)}</div>
					<div class="col col-1" data-label="numberNodest">${BX.util.htmlspecialchars(sub.numberNodes)}</div>
					<div class="col col-1" data-label="customization">${!!sub.customization ? 'Разрешить' : 'Запретить'}</div>
					<div class="col col-1" data-label="customization">${!!sub.isActive ? 'Активна' : 'Неактивна'}</div>
					<div class="col col-1" data-label="action">
						<ul class="action-list">
							<li class="action-item">
								<label class="checkbox">
									<input class="input-checkbox" data-btn-id="${sub.id}" ${sub.isActive ? "checked" : ''} type="checkbox" />
									<svg viewBox="0 0 21 18">
										<symbol id="tick-path${sub.id}" viewBox="0 0 21 18" xmlns="http://www.w3.org/2000/svg">
											<path d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69" fill="none" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" />
										</symbol>
										<defs>
											<mask id="tick${sub.id}">
												<use class="tick mask" href="#tick-path${sub.id}" />
											</mask>
										</defs>
										<use class="tick" href="#tick-path${sub.id}" stroke="currentColor" />
										<path fill="white" mask="url(#tick${sub.id})" d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z" />
									</svg>
									<svg class="lines" viewBox="0 0 11 11">
										<path d="M5.88086 5.89441L9.53504 4.26746" />
										<path d="M5.5274 8.78838L9.45391 9.55161" />
										<path d="M3.49371 4.22065L5.55387 0.79198" />
									</svg>
								</label>
							</li>
							<li class="action-item">
								<button data-btn-id="${sub.id}" id="btnEdit" class="action-list-btn edit">
									<svg data-btn-id="${sub.id}" class="btn-svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path data-btn-id="${sub.id}" fill-rule="evenodd" clip-rule="evenodd" d="M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z" fill="green"/>
									</svg>
								</button>
							</li>
						</ul>
					</div>
				</li>
			`;
		});
	}
}