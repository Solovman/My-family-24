import {Tag} from 'main.core';
export class Content
{
	static render()
	{
		const icons = Tag.render`
			<div>test</div>
		`;

		return icons;
	}
}