var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    if (req.url === '/app') {
        //Outputting JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        var obj = {
            firstname: 'Tomiwa',
            lastname: 'Ogunbamowo'
        }
        res.end(JSON.stringify(obj));
    }
    else if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });// Outputting HTML
        fs.createReadStream(__dirname + '/index.html').pipe(res); //Using Asynchronous stream - Piping
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });// Outputting HTML
        var html = fs.readFileSync(__dirname + '/index.html', 'utf8') //Store content of file to html var
        html = html.replace('{Message}', `404 - Page not found on '${req.url}'`);
        res.end(html);

    }

}).listen(1337, '127.0.0.1');