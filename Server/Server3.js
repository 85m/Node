var http = require('http');
var fs 	 = require('fs'); //module lisant les fichier


var server 	= http.createServer();
var io = require('socket.io').listen(server); //Exoute le server qui est en port 3000


var Req = {

	Process:function(req,res){
		fs.readFile('../index.html','utf-8',function(error,content){

			res.writeHead(200, {"Content-Type":"text/html"});
			res.write(content);
			res.end();

		});
	},
	IOConnection:function(){
		//socket.on(){}
	}
}