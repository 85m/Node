var express = require('express');
//var app = express();
var http = require('http');
var path = require("path");
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {

var now = new Date();

	var filename = req.url;
	var ext = path.extname(filename);
	var localPath = __dirname;
	var validExtensions = {
		".html" : "text/html",
		".js": "application/javascript",
		".css": "text/css",
		".txt": "text/plain",
		".jpg": "image/jpeg",
		".gif": "image/gif",
		".png": "image/png",
		".ico": "icon"
	};
	//console.log("toto " + localPath);
	var isValidExt = validExtensions[ext];

	if (isValidExt) {
		localPath += filename;
		fs.exists(localPath, function(exists) {
			if(exists) {
				console.log("Serving file: " + localPath);
				getFile(localPath, res, isValidExt);
			} else {
				//console.log("File not found: " + localPath);
				res.writeHead(404);
				res.end();
			}
		});

	} else {
		console.log("Invalid file extension detected: " + ext);
	}



});
// Chargement de socket.io
var io = require('socket.io').listen(server);
io.on('connection', function (socket) {

	socket.on('message', function (data) {
		console.log(data);
	});

	socket.on('orientationAlpha', function (data) {
		socket.broadcast.emit('orientationAlpha2',data);
		//console.log(data);
	});

	socket.on('calibrationWaited', function (data) {
		socket.broadcast.emit('calibrationStatus',data);
		//console.log(data);
	});

	socket.on('restartGame', function (data) {
		console.log(data);
		if(data){
			socket.broadcast.emit('canRestart', true);
		}
	});
});

server.listen(8080);

/**************************************************************************/
function getFile(localPath, res, mimeType) {
	fs.readFile(localPath, function(err, contents) {
		if(!err) {
			res.setHeader("Content-Length", contents.length);
			res.setHeader("Content-Type", mimeType);
			res.statusCode = 200;
			res.end(contents);
		} else {
			res.writeHead(500);
			res.end();
		}
	});
}