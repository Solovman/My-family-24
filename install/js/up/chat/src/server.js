const WebSocket = require('ws');

const clients = {};

const server = new WebSocket.Server({port: 3000});
server.on('connection', function (ws) {

	ws.on('message', function (message) {

		const data = JSON.parse(message.toString());

		if (data.type === 'userId') {
			const userId = data.userId;

			clients[userId] = ws;

			console.log(`Client registered with userId: ${userId}`);

		} else {
			const userId = data.userId;
			const chatId = data.chatId;
			const messageUser = data.text;
			const authorId = Number(data.authorId);
			const recipientId = Number(data.recipientId);

			const response = JSON.stringify({ chatId, text: messageUser, authorId, recipientId, userId });

			for (const userId in clients) {
				if (Number(userId) === recipientId || Number(userId) === authorId) {
					clients[userId].send(response);
				}
			}
		}

	});

	ws.send('msg from server!')
	ws.on('close', function (message) {
		console.log('closed', message)
	})
})
