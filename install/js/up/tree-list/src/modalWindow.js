export class ModalWindow
{
	static render()
	{
		let modalPopup = BX.PopupWindowManager.create("ModalPopup", null, {
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
					this.setContent(BX("bx_popup_modal_tree"));
				},
			},
		});

		modalPopup.show();
	}
}