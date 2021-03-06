console.log('Loading express server...');

var CONFIG = require('../../build.config');
var path = require('path');
var pkg = require(path.resolve('./package.json'));
var express = require('express');
var favicon = require('serve-favicon');
var api = require('../api/testapi'); // Runs restify api in tandem
var app = express();


app.use('/', express.static('./build/'));

// app.use(express.static('build/images'));

app.use('/bower_components',  express.static('bower_components'));
app.use('/node_modules',  express.static('node_modules'));
app.use('/build', express.static('build'));
app.use(favicon(__dirname + '/favicon.ico'));

app.get('/', function(req, res)
{
	console.log("app::get/");
	//res.send('Default Express server response. Perhaps you should run grunt serve --dev or --build');
	res.sendFile('/build/index.html');
});

app.use(function(req, res, next)
{
	console.log("app::use fallback");
    console.log('Falling back to build/index.html instead of ' + req.url);
    req.url = 'build/index.html';
});


app.listen(CONFIG.staticServer.port, function()
{
    console.log('Demo server started on port ' + CONFIG.staticServer.port);
});
