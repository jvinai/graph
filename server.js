'use strict';

var express = require('express');
var moment = require('moment');
var repeat = require('repeat');
var app = express();

app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/front', express.static(__dirname + '/front'));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/get', function (req, res) {

  var data1 = [];
  var data2 = [];
  var data3 = [];
  var secondIndex = 55;

  for (var i = 0; i < 10; i++) {
    var timestamp = moment().subtract(secondIndex, 'seconds').unix() * 1000;
    data1.push([timestamp, Math.floor((Math.random() * 10))]);
    data2.push([timestamp, Math.floor((Math.random() * 10))]);
    data3.push([timestamp, Math.floor((Math.random() * 10))]);
    secondIndex = secondIndex - 5;
  }

  var originalValues = {
    meteors: data1,
    rabbitJump: data2,
    ricochet: data3
  };


  res.send(originalValues);
});

var server = app.listen(3000);
var io = require('socket.io')(server);

console.log('Server start on port 3000');

var emitWS = function () {
  console.log('ding');
  io.sockets.emit('getData', {
    date: moment().unix() * 1000,
    meteors: Math.floor((Math.random() * 10)),
    rabbitJump: Math.floor((Math.random() * 10)),
    ricochet: Math.floor((Math.random() * 10))
  });
};

repeat(emitWS).every(5, 's').start.in(5, 'sec');
