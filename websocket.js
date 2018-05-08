var WebSocketClient = require('websocket').client;

var client = new WebSocketClient();

var sendMsg = function(connection) {
	connection.sendUTF('2');
}

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

	var header = null;
	connection.on('message', function(message) {
		var strMsg = JSON.stringify(message.utf8Data);

		try {
			objMsg = JSON.parse(strMsg.substring(strMsg.indexOf('{'), strMsg.lastIndexOf('}') + 1).replace(/\\+\"/g, '\"').replace(/\\+(u\w{4})/g, '\\$1'));
		} catch(e) {
			objMsg = {};
		}

		if (header == null) {
			header = objMsg;
			interval = setInterval(function() {connection.sendUTF('2')}, header.pingInterval);
			return;
		}

		if (objMsg.type == 0 && objMsg.data.stamp == null) {
			console.log(objMsg.data.message);
		}
	});
});

client.connect('');

