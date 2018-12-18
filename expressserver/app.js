var express = require('express/lib/express');
var app = express();


var port = process.env.PORT || 3000; //If ENV port is set use it, else 3000

app.get('/', function(req, res){
    res.send('<html><head><title>Toms Express Server</title></head><body><h1>Header 1</h1>Hello World on Express Server</body></html>');
})

app.listen(port);