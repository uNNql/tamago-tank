var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var basedir = path.join(__dirname, '..');
var util = require('util');

app.configure(function () {
	app.set('view engine', 'jade');
	app.set('views', path.join(basedir, '/template/jade'));
	app.use(express.static(path.join(basedir + '/public')));
	app.set('port', 8888);
});

// routing
app.get('/', function (req, res) {
	res.render('user');
});

app.get('/main', function (req, res) {
	res.render('main');
});

// require('./web/').register(app);

var server = http.createServer(app).listen(app.get('port'), function () {
	console.log(util.format('Express server listening on port: %s', app.get('port')));
});

// io
require('./io').register(server);