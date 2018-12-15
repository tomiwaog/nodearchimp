function apiJsonFileHTTPS(callback) {
    var url = 'https://jsonplaceholder.typicode.com/todos/1'; //Sample api call, found on jsonplaceholder.typicode.com
    var wtableTemp = fs.createWriteStream(__dirname + '/tempjson.json');
    var xt = fs.createWriteStream(__dirname + '/tom.json');
    https.get(url, (resp) => {
        console.log("Running First!");
        let data = '';
        resp.on('data', (dataChunk) => {

            data += dataChunk;
            wtableTemp.write(dataChunk);
            console.log("Got chunk!");
        });
    }).on('error', (err) => {
        getLocalFile();
        console.log("Error: " + err.message);
    });
    callback('tom.json', 'tempjson.json');
}