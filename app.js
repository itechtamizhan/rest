var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require("./mongo/mongooperation.js");
var app = express();
var port = (process.env.PORT || process.env.VCAP_APP_PORT || 8989);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.post('/api/create',function(req,res){
	
	var request = req.body ;
	console.log("***"+JSON.stringify(request));
	if(request.body){
		request.body = JSON.parse(request.body);
	}
	db.insertcollection(request,function(err,result){
		var resp = {};
		if(err){
			resp.code = 400 ;
			resp.message = "exception occurs.";
			resp.error = err;
			return res.send(resp);
		}
		resp.code = 200 ;
		resp.message = "success";
		resp.result= result ;
	return res.send(result);

	});
	

});



app.get('/api/retrieveall',function(req,res){
	
	db.retrieveCollection({},function(err,result){
	var resp = {};

		if(err){
			resp.code = 400 ;
			resp.message = "exception occurs.";
			resp.error = err ;
			return res.send(resp);
		}
		
		resp.code = 200 ;
		resp.message = "success";
		resp.result= result ;
	return res.send(result);
	});
});

app.get('/api/:id',function(req,res){
	var id = req.params.id ;
	var query = {};
	query._id = id ;
	db.retrieveOneCollection(query,function(err,result){
	var resp = {};

		if(err){
			resp.code = 400 ;
			resp.message = "exception occurs.";
			resp.error = err ;
			return res.send(resp);
		}	
		
		resp.code = 200 ;
		resp.message = "success";
		resp.result= result ;
	return res.send(result);
	});
});


var server = app.listen(port,function(){
	console.log('Server running at http://127.0.0.1:'+port);
});
