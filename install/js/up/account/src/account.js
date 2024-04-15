import {Type} from 'main.core';

export class Account
{
	constructor(options = {})
	{
		if (Type.isStringFilled(options.rootNodeId))
		{
			this.rootNodeId = options.rootNodeId;
		}
		else
		{
			throw new Error('Account: options.rootNodeId required');
		}

		this.rootNode = BX(this.rootNodeId);

		if (!this.rootNode)
		{
			throw new Error(`Account: element with id "${this.rootNodeId}" not found`);
		}
	}
}
