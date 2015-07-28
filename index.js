// mount index and js
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));

var server = require('http').createServer(app);
var io = require('socket.io')(server);

server.listen(process.env.PORT || 1234);
