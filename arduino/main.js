var j5 = require('johnny-five');
var events = require('events').EventEmitter;
var socket = require('socket.io-client').connect('http://localhost:8888');

var myBoard, myLed;

myBoard = new j5.Board();

myBoard.on('ready', function () {
	console.log('ready');
	var ev = new events();
	var sppedSet = [0, 128, 255];
	var lSpeed = sppedSet[2];
	var rSpeed = sppedSet[2];
	var direction = 1;
	socket.on('devicemotion', function (e) {
		ev.emit('devicemotion', e.e.acg.x, e.e.acg.y);
	});
	socket.on('connect', function () {
		console.log('connect socket');
	});
	socket.on('leave', function () {
		console.log('disconnect');
	});
	ev.on('devicemotion', function (acgX, acgY) {
		if (acgX < -4) {
			lSpeed = sppedSet[1];
		} else if (acgX > 4) {
			rSpeed = sppedSet[1];
		} else {
			lSpeed = rSpeed = sppedSet[2];
		}
		if (acgY > -2) {
			direction = 1;
		} else {
			direction = 0;
		}
	});

	/**
	 * Set pins
	 */

	// left motor
	this.pinMode(12, 1);
	this.pinMode(13, 1);
	this.pinMode(11, 3);

	// right motor
	this.pinMode(4, 1);
	this.pinMode(2, 1);
	this.pinMode(3, 3);

	this.loop(500, function () {
		this.digitalWrite(12, !direction);
		this.digitalWrite(13, direction);
		this.analogWrite(11, lSpeed);

		this.digitalWrite(4, direction);
		this.digitalWrite(2, !direction);
		this.analogWrite(3, rSpeed);
	});
});