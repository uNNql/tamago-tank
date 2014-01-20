var j5 = require('johnny-five');
var socket = require('socket.io-client').connect('http://localhost:8888');

var myBoard, myLed;

myBoard = new j5.Board();

myBoard.on('ready', function () {
	console.log('ready');
	// console.log(j5.Pin.PWM)
	var val = 1;
	this.pinMode(12, 1);
	this.pinMode(13, 1);
	this.pinMode(11, 3);
	// 12 > 0, 1 > 0 静止
	// 13 > 1, 1 > 0 正転
	this.loop(2000, function () {
		console.log('loop');
		this.digitalWrite(12, val ? 0 : 1);
		this.digitalWrite(13, val);
		val = val ? 0 : 1;
		this.analogWrite(11, 100);
	});

	// this.digitalWrite(12, 1);
	// this.digitalWrite(13, 0);
	// this.analogWrite(3, 255);

	// this.pinMode(1, 1);
	// this.pinMode(2, 1);
	// this.loop(100, function () {
	// 	this.digitalWrite(1, 1);
	// 	this.digitalWrite(2, 0);
	// });
	// this.digitalWrite(1, 1);
	// this.digitalWrite(2, 1);
	// myLed = new j5.Led(13);
	// myLed.strobe(1000);
	// this.repl.inject({
	// 	led: myLed
	// });

	// this.pinMode(3, j5.Pin.PWM);
	// this.loop(1000, function () {
	// 	this.analogWrite(3, 10);
	// });

});

// socket.on('devicemotion', function (e) {
// 	console.log('devicemotion');
// });