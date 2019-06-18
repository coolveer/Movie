var express = require('express');
var app = express();
var request = require('request');
app.set("view engine", "ejs");
app.use('/static', express.static('./static'));

app.get('/',function(req,res){
	res.render('index.ejs');
});

app.get('/results',function(req,res){

	var search = req.query.search;
	url = "http://www.omdbapi.com/?apikey=thewdb&s="+search;
	
	request(url, function(error,response,body){
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			if (data["Response"] == "False") {
				res.render("error" , {search : search});
			} else {
				res.render("results" , {data : data});
			}
			
		}
	});
});


app.get('/movie',function(req,res){
	var searchid = req.query.imdbid;
	url = "http://www.omdbapi.com/?apikey=thewdb&i="+searchid;

	request(url,function(error,response,body){
		if (!error && response.statusCode == 200) {
			var mdata = JSON.parse(body);
			res.render('movie.ejs', {mdata : mdata});
		}
	});
	
});


app.listen(1337, function(){
	console.log('listing at port no 1337');
});