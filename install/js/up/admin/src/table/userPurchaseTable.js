import {Tag} from 'main.core';
export class UserPurchaseTable
{
	static render(data)
	{
		const headingTable = Tag.render`
			<li class="table-header">
				<div class="table-head col col-1">USER_ID</div>
				<div class="table-head col col-1">SINGLE_PURCHASE_ID</div>
				<div class="table-head col col-1">ACTION</div>
			</li>
		`;

		const dataUserPurchase = this.renderList(data);

		const table =  Tag.render`
			<ul class="responsive-table"></ul>
		`;

		BX.append(headingTable, table);

		dataUserPurchase.forEach(el => {
			BX.append(el, table);
		})

		return table;
	}

	static renderList(data) {
		return data.map(userPurchase => {
			return Tag.render`
				<li class="table-row">
					<div class="col col-1" data-label="Job Id">${userPurchase.userId}</div>
					<div class="col col-1" data-label="Customer Name">${userPurchase.singlePurchaseId}</div>
					<div class="col col-1" data-label="Customer Name">
							<button class="action-list-btn remove__user_purchase" data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}">
								<svg data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}" d="M10 12V17" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}" d="M14 12V17" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}" d="M4 7H20" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}" d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path data-btn-user-id="${userPurchase.userId}" data-btn-purchase-id="${userPurchase.singlePurchaseId}" d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>
					</div>
				</li>
			`;
		});
	}
}