var express = require('express');
var app = express();
var path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

server = app.listen(8080);

console.log('Server running on port 8080');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/donate/', function(req, res) {
  var data = req.body;
  try {
  	console.log(data);
  	//send ok if data is good
  	res.sendStatus(200);
  } catch(err){
  	//send internal error if something goes wrong
  	res.sendStatus(500);
  }
  
});