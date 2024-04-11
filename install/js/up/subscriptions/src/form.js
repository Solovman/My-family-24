export class Form
{
	static render()
	{
		let buyPopup = BX.PopupWindowManager.create("FormPopup", null, {
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
					this.setContent(BX("bx_popup_form"));
				},
				onPopupClose: function ()
				{
					const modal = document.querySelector('.sign-up-modal');

					BX.removeClass(modal, 'sing-modal-free');
					BX.removeClass(modal, 'sing-modal-standard');
					BX.removeClass(modal, 'sing-modal-premium');
				}
			},
		});

		buyPopup.show();
	}
}