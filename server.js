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
  console.log(data);
});