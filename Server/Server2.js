var express = require('express');

var server 	= express();
server.get('/',Request);
server.listen(3000);


function Request(req,res){

	res.setHeader('Content-Type','text/plain')
	res.write('Express is Life');

	res.end();
}