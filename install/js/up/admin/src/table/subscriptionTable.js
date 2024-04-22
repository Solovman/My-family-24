import {Tag} from 'main.core';
import {Form} from "../form/form";

export class SubscriptionTable
{
	static render(data)
	{
		const headingTable = Tag.render`
			<li class="table-header">
				<div class="table-head col col-1">ID</div>
				<div class="table-head col col-1">NAME</div>
				<div class="table-head col col-1">PRICE</div>
				<div class="table-head col col-1">NUMBER_TREES</div>
				<div class="table-head col col-1">NUMBER_NODES</div>
				<div class="table-head col col-1">CUSTOMIZATION</div>
				<div class="table-head col col-1">IS_ACTIVE</div>
				<div class="table-head col col-1">ACTION</div>
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
					<div class="col col-1" data-label="id">${sub.id}</div>
					<div class="col col-1" data-label="level">${sub.level}</div>
					<div class="col col-1" data-label="price">${sub.price}</div>
					<div class="col col-1" data-label="numberTrees">${sub.numberTrees}</div>
					<div class="col col-1" data-label="numberNodest">${sub.numberNodes}</div>
					<div class="col col-1" data-label="customization">${String(!!sub.customization)}</div>
					<div class="col col-1" data-label="customization">${String(!!sub.isActive)}</div>
					<div class="col col-1" data-label="action">
						<ul class="action-list">
							<li class="action-item">
								<button id="btnDeactivation" data-btn-id="${sub.id}" class="deactivation action-list-btn">
									<svg data-btn-id="${sub.id}" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path data-btn-id="${sub.id}" d="M10 12V17" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path data-btn-id="${sub.id}" d="M14 12V17" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path data-btn-id="${sub.id}" d="M4 7H20" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path data-btn-id="${sub.id}" d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										<path data-btn-id="${sub.id}" d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									</svg>
								</button>
							</li>
							<li class="action-item">
								<button id="btnActivation" data-btn-id="${sub.id}" class="activation action-list-btn">
									<svg data-btn-id="${sub.id}" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path data-btn-id="${sub.id}" fill-rule="evenodd" clip-rule="evenodd" d="M8.70711 4.70711C9.09763 4.31658 9.09763 3.68342 8.70711 3.29289C8.31658 2.90237 7.68342 2.90237 7.29289 3.29289L3.29289 7.29289C2.90237 7.68342 2.90237 8.31658 3.29289 8.70711L7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071C9.09763 12.3166 9.09763 11.6834 8.70711 11.2929L6.41421 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H6.41421L8.70711 4.70711ZM20.7071 15.2929L16.7071 11.2929C16.3166 10.9024 15.6834 10.9024 15.2929 11.2929C14.9024 11.6834 14.9024 12.3166 15.2929 12.7071L17.5858 15H8C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17H17.5858L15.2929 19.2929C14.9024 19.6834 14.9024 20.3166 15.2929 20.7071C15.6834 21.0976 16.3166 21.0976 16.7071 20.7071L20.7071 16.7071C21.0976 16.3166 21.0976 15.6834 20.7071 15.2929Z" fill="blue"/>
									</svg>
								</button>
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