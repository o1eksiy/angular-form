var express = require('express');
var app = express();
var path = require('path');
var port = 8080;

app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, '/public'))); //  "public" off of current is root

app.get('/*', function(req, res){
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port);
console.log('go to http://localhost:' + port);