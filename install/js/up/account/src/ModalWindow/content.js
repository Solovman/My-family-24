import {Tag} from 'main.core';
import {Requests} from "../requests.js";
export class Content
{
	static render(list)
	{
		const container = Tag.render`
			<div class="avatars__choose-container">
				<h2 class="avatars__choose">Выберите аватар</h2>
			</div>
		`;

		const avatarsContainer = Tag.render`
			<ul id="avatars__list"></ul>
		`;

		const btnSave = Tag.render`
			<button id="avatars__save">
				<div id="spinner-save" class="spinner-border text-light" role="status">
				  <span class="visually-hidden">Loading...</span>
				</div>
				Сохранить
			</button>
		`;

		list.forEach(avatar => {
			const icon = Tag.render`
			<li  class="avatars__item">
				<span data-item-active="${avatar.ID}" class="article__active">
					<svg height="30px" width="30px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
						viewBox="0 0 512 512" xml:space="preserve">
						<path style="fill:#00ceaa;" d="M256,504C119.033,504,8,392.967,8,256S119.033,8,256,8s248,111.034,248,248
						C503.846,392.902,392.902,503.846,256,504z"/>
						<path style="fill:#00ceaa;" d="M256,16c132.548,0,240,107.452,240,240S388.548,496,256,496S16,388.548,16,256
						C16.15,123.513,123.513,16.15,256,16 M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z"
						/>
						<polygon style="fill:#FFFFFF;" points="345.032,137.848 216.896,295.887 163.04,242.728 127.528,281.848 221.056,374.152 
						384.472,172.608 "/>
						</svg>
				</span>
				<button data-id-avatar="${avatar.ID}" class="avatars__btn">
					<img data-id-avatar="${avatar.ID}" class="avatars__img" src="${avatar.FILE_NAME}" alt="avatar${avatar.ID}">
				</button>
			</li>
		`;

			BX.append(icon, avatarsContainer);
		})

		BX.append(avatarsContainer, container);
		BX.append(btnSave, container);

		return container;
	}
}