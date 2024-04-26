import {Tag} from 'main.core';

export class Content
{
	static render(data)
	{
		return Tag.render`
			<div class="security">
				<h2 class="security__heading">Пользовательское соглашение</h2>
				<p class="security-info">
					Вы хотите активировать поиск в этом дереве? 
 					Ваша информация о дереве будет доступна другим пользователям. Вы также разрешаете пользователю отправлять вам сообщения.
				</p>
				<div class="security-checkbox">
					<input ${!data.is_security ? "checked" : ''} type="checkbox" id="cbx" style="display: none;">
					<label for="cbx" class="check">
					  <svg width="18px" height="18px" viewBox="0 0 18 18">
						<path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
						<polyline points="1 9 7 14 15 4"></polyline>
					  </svg>
					</label>
					<label for="cbx" class="security-text">Я принимаю условия Пользовательского соглашения</label>
				</div>
				<button id="security-save" class="security-save">
					<div class="spinner-border text-light" role="status">
					  <span class="visually-hidden">Loading...</span>
					</div>
					<span>Сохранить</span>
				</button>
			</div>
		`;
	}
}