var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 8989);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/create',function(req,res){
	
	return res.send({"Test":true});
	

});




var server = app.listen(port,function(){
	console.log('Server running at http://127.0.0.1:'+port);
});
