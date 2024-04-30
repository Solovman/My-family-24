import {Type, Tag} from 'main.core';
import {Requests} from "./requests.js";

export class Form
{
	static render(id, name, surname)
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
							<form id="formSend" class="message__form">
								<label class="message__label" for="message">Напишите сообщение: ${name + ' ' + surname}</label>
								<input id="message" placeholder="Ваше сообщение" type="text">
								<button id="send" class="message__button">Отправить</button>
							</form>
						</div>
					`);

					const formSend = BX('formSend');

					BX.bind(formSend, 'submit', (event) => {
						event.preventDefault();

						const message = BX('message').value;

						Requests.addMessages(Number(id), message).then(result => {
							const notice = document.querySelector(`[data-user-check="${id}"]`);

							notice.innerHTML = 'Сообщение отправлено'
							this.destroy();
						});
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