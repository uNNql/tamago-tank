exports.register = function (server) {
	var io = require('socket.io').listen(server);
	io.sockets.on('connection', function (socket) {
		console.log('-----connect----->', socket.id);

		// message
		socket.emit('message', { msg: 'you connect !!' });

		// add
		socket.broadcast.emit('add', { id: socket.id });

		// devicemotion
		socket.on('devicemotion', function (e) {
			socket.broadcast.emit('devicemotion', { e: e, id: socket.id });
		});

		// disconnect
		socket.on('disconnect', function () {
			console.log('-----disconnected-----');
			socket.broadcast.emit('leave', { id: socket.id });
		});
	});
};