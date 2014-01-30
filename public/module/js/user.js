var socket = io.connect('/');
var vp = $.viewport();
var tamago = $('.tamago');
var deg = 0;

tamago.css({
	top: vp.window.height / 2 - tamago.height() / 2,
	left: vp.window.width / 2 - tamago.width() / 2
});

window.addEventListener('devicemotion', function (e) {
	var acg = e.accelerationIncludingGravity;
	socket.emit('devicemotion', {acg: acg});
});