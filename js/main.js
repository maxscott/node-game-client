var simulation = require('simulation');
var canvas = document.getElementById('meow');
var ctx = canvas.getContext('2d');
var io = require('socket.io/socket.io.js')('http://localhost:12345');

simulation.initialize(canvas, ctx, window, io);
