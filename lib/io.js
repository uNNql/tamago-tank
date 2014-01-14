exports.register = function (server) {
	var io = require('socket.io').listen(server);
	io.sockets.on('connection', function (socket) {
		console.log('-----connected-----');
		console.log(socket.id);
		// socket.on('msg send', function () {

		// });
		socket.emit('message', { msg: 'you connect !!' });
		socket.broadcast.emit('add', { id: socket.id });
		socket.on('devicemotion', function (e) {
			console.log('devicemotion');
			console.log(e);
			socket.broadcast.emit('devicemotion', { e: e, id: socket.id });
		});
		socket.on('disconnect', function () {
			console.log('-----disconnected-----');
			socket.broadcast.emit('leave', { id: socket.id });
		});
	});
};