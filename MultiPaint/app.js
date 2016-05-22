var express = require('express');
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Req = 
{
	Process: function(req, res)
	{
		res.sendFile(path.join(__dirname + '/index.html'));
	},

	IOConnection: function(socket) 
	{
	    socket.on('mousemove', function (data) 
	    {
	    	//console.log(data);
			socket.broadcast.emit('moving', data);
		});

    }
};


app.get("/", Req.Process);
server.listen(8080);
io.on('connection', Req.IOConnection);