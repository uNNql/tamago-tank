var socket = io.connect('/');
var acX = $('.acX').find('.text');
var acY = $('.acY').find('.text');
var acZ = $('.acZ').find('.text');
var acgX = $('.acgX').find('.text');
var acgY = $('.acgY').find('.text');
var acgZ = $('.acgZ').find('.text');
var rrA = $('.rrA').find('.text');
var rrB = $('.rrB').find('.text');
var rrG = $('.rrG').find('.text');


// socket.on('message', function (obj) {
// 	console.log(obj);
// });
window.addEventListener('devicemotion', function (e) {
	var ac = e.acceleration;
	acX.text(ac.x); //x方向の傾き加速度
	acY.text(ac.y); //y方向の傾き加速度
	acZ.text(ac.z); //z方向の傾き加速度

	var acg = e.accelerationIncludingGravity;
	acgX.text(acg.x); //x方向の傾き重力加速度
	acgY.text(acg.y); //y方向の傾き重力加速度
	acgZ.text(acg.z); //z方向の傾き重力加速度

	var rr = e.rotationRate;
	rrA.text(rr.alpha); //z軸の回転加速度
	rrB.text(rr.beta); //x軸の回転加速度
	rrG.text(rr.gamma); //y軸の回転加速度

	socket.emit('devicemotion', { ac: ac, acg: acg, rr: rr });
});

// window.addEventListener('deviceorientation', function (e) {
// 	socket.emit('deviceorientation', e);
// });