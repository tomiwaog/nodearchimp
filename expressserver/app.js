var express = require('express');
var app = express();
var fs = require('fs');


var port = process.env.PORT || 3000; //If ENV port is set use it, else 3000

app.get('/', function (req, res) {
    res.send('<html><head><title>Toms Express Server</title><link href=assets/style.css type=text/css rel=stylesheet></head><body><h1>Header 1</h1>Hello World on Express Server</body></html>');
})

app.get('/txt', function (req, res) {
    res.send("Just responding text");
})

app.get('/api', function (req, res) {
    res.json({ name: 'FirstName Here', lastName: 'Last Name Here', empID: 'EMP232' })
})

//Maps route to a directory | Middleware between request and response
app.use('/assets', express.static(__dirname+'/public') );

app.get('/mid/:param', (req, res) => {
    var param = req.params.param;
    if (param === 'tom') {
        res.send(`Tom. This is a middleware with param '${param}'`);
    }
    else {
        res.send('Other Param Specified!');
    }
});

app.get('/home', function (req, res) {
    fs.createReadStream(__dirname + '/index.html').pipe(res);
})
app.listen(port);