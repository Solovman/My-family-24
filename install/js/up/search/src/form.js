import {Type, Tag} from 'main.core';

export class Form
{
	static render(name, surname)
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
					this.setContent(Tag.render`
						<div id="form-message" class="message">
							<form class="message__form">
								<label class="message__label" for="message">Напишите сообщение: ${name + ' ' + surname}</label>
								<input id="message" placeholder="Ваше сообщение" type="text">
								<button class="message__button">Отправить</button>
							</form>
						</div>
					`);

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