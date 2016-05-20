var http 		= require('http');
var url 		= require('url');
var querystring = require('querystring');

var server 	= http.createServer();
server.on("request", Request);
server.listen(3000);


function Request(req,res){

	var parameters = querystring.parse(url.parse(req.url).query);//?foo=bar
	console.log(parameters);
	//var path = url.parse(req.url).pathname;
	//console.log(path);

	res.writeHead(200, {"Content-Type": "text/plain"});

/*	if(path == '/'){
		res.write('Home');
	}else if(path == '/anythingElse'){
		res.write('You want anything else');
	}*/

	for(var p in parameters){
		res.write('parmeters: ' + p + ' sucessfully parsed\n');
		console.log('parmeters: ' + p + ' sucessfully parsed\n');
	}

	res.end();
}