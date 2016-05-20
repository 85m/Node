var http 		= require('http');
var event 		= require('events').EventEmitter;

var server 	= http.createServer();
server.on("request", Request);
server.listen(3000);


function Request(req,res){

	game.emit('newPlayer','Join by New Player!');
	res.writeHead(200);
	res.write('Hello player');

	res.end();
}

var cpt = 0;
var game = new event();

game.on('newPlayer', Begin);

function Begin(msg){
	console.log(msg +" : "+cpt++);
}