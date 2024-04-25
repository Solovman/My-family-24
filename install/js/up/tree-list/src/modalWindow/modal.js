import {Content} from "./content";
import {Requests} from "../requests.js";
import {TreeList} from "../tree-list.js";

export class Modal
{
	static render(data)
	{
		const popupId = "ModalPopup_" + new Date().getTime();

		let modalPopup = BX.PopupWindowManager.create(popupId, null, {
			autoHide: true,
			offsetLeft: 0,
			offsetTop: 0,
			overlay : true,
			draggable: {restrict:true},
			closeByEsc: true,
			closeIcon: { right : "12px", top : "10px"},
			content: `<div style=\"width:400px;height:400px; text-align: center;\"><span style=\"position:absolute;left:50%; top:50%\"><img src=\"/bitrix/templates/eshop_adapt_yellow/img/wait.gif\"/></span></div>`,
			events: {
				onPopupShow: function()
				{
					this.setContent(Content.render(data));

					const saveBtn = BX('security-save');
					const checkbox = BX('cbx');

					BX.bind(saveBtn, 'click', () => {
						if (checkbox.checked) {
							Requests.updateSecuritySearchStatus(data.id, 0)
								.then(() => {
									new TreeList({
										rootNodeId: 'tree-list',
									});
									this.destroy();
								})
								.catch((error) => {
									console.error('Error when update security status a tree:', error);
								});
						} else {
							Requests.updateSecuritySearchStatus(data.id, 1)
								.then(() => {
									new TreeList({
										rootNodeId: 'tree-list',
									})
									this.destroy();
								})
								.catch((error) => {
									console.error('Error when update security status a tree:', error);
								});
						}
					})

				},
				onPopupClose: function ()
				{
					this.destroy();
				}
			}
		});

		modalPopup.show();
	}
}