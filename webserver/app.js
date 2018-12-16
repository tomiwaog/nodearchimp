var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){

    res.writeHead(200, {'Content-Type': 'text/html'});
    //var html = fs.readFileSync(__dirname+'/index.html', 'utf8');
    // html = html.replace('{Message}', "OGA MI New Message replacement");
    // res.end(html);

    //Using Asynchronous stream
    fs.createReadStream(__dirname+'/index.html').pipe(res)
}).listen(1337, '127.0.0.1');