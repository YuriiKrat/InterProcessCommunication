var api = {};
global.api = api;
api.net = require('net');
api.os = require('os');

var task = [2, 17, 3, 2, 5, 7, 15, 22, 1, 14, 15, 9, 0, 11];
var cpuNumber = api.os.cpus().length;
var parts = [];
var clients = [];

var part = task.length / cpuNumber;

var server = api.net.createServer(function (socket) {

    if (clients.length == cpuNumber) {
        process.exit(1);
    }

    clients.push(socket);
    var count = clients.length;

    var startIndex = part * (clients.length - 1);
    
    socket.write(JSON.stringify(task.slice(startIndex, startIndex + part)));

    socket.on('data', function (data) {
        console.log('Result recieved by server:' + data);
        parts[count] = JSON.parse(data);
        var result = [];
   		parts.forEach(function (res) {
        	result = result.concat(res);
    });
        console.log("General result is: " + result);
    });
}).listen(2000);