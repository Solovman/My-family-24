import {Content} from "./content.js";
import {Requests} from "../requests";
import {Account} from "../account.js";

export class Window
{
	static render(list)
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
					this.setContent(Content.render(list));

					const userNowAvatarId = BX('user-icon').dataset.idFile;


					const icons = document.querySelectorAll('.avatars__btn');
					const btnSave = BX('avatars__save');
					const iconsAvatar = document.querySelectorAll('.avatars__btn');
					let avatarId;

					icons.forEach(icon => {
						if (icon.dataset.idAvatar === userNowAvatarId) {
							BX.addClass(icon, 'is-active');

							const check = document.querySelector(`[data-item-active="${icon.dataset.idAvatar}"]`);
							check.style.display = 'block';
						}


						BX.bind(icon, 'click', (event) => {

							const checks = document.querySelectorAll('.article__active');

							checks.forEach(check => {
								check.style.display = 'none';
							})

							icons.forEach(icon => {
								BX.removeClass(icon, 'is-active');
							})

							const activeBtn = event.currentTarget;
							const btnId = activeBtn.dataset.idAvatar;

							const activeCheck = document.querySelector(`[data-item-active="${btnId}"]`);

							activeCheck.style.display = 'block';

							BX.addClass(activeBtn, 'is-active');
						})
					});

					BX.bind(btnSave, 'click', () => {
						btnSave.disabled = true;

						iconsAvatar.forEach(icon => {
							if (icon.classList.contains('is-active')) {
								avatarId = Number(icon.dataset.idAvatar);
							}
						});

						Requests.updateUserImagesByAvatarId(avatarId).then(result => {
							new Account({
								rootNodeId: 'data-profile',
							})
							btnSave.disabled = false;
							this.destroy();
						})
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
