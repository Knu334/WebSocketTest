var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

client.on('connectFailed', function(error) {
	console.log('Connect Erroe: ' + error.toString());
});

client.on('connect', function(connection) {
	connection.on('error', function(error) {
		console.log('Connection error: ' + error.toString());
	});

	connection.on('close', function() {
		console.log('close');
	});

	connection.on('message', function(message) {
		var strMsg = JSON.stringify(message.utf8Data);
		console.log(strMsg.substring(strMsg.indexOf('{'), strMsg.lastIndexOf('}') + 1).replace(/\\+\"/g, '\"').replace(/\\+(u\w{4})/g, '\\$1'));
		//console.log(objMsg.data.user_name);
	});
});

client.connect('')
