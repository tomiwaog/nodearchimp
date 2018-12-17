//This module updates a local file with an online version. Written for GSK Use SAP API Usecase
var fs = require('fs');
var zlib = require('zlib');
const request = require('request');
function localJsonFile1() {
    return fs.readFileSync(__dirname + '/greet.json', 'utf8');
}
var greet1 = localJsonFile1();
//console.log(greet1);

//Asynchronous call - continue other processes, Doesnt wait for function to complete before running others.
function localJsonFIle2() {
    return fs.readFile(__dirname + '/greet.json', 'utf8',
        function (err, data) {
            console.log(data);
        });
}
var greet2 = localJsonFIle2();

//Function only receives Item or Input as parameter
function sapAPIRetriever(useCaseRefNum, ) {
    var tempDownloadDir = '\\tempdownloads\\'
    //FUnction Downloads API files and writes it to a local File
    var url = 'https://jsonplaceholder.typicode.com/todos/1'; //Sample api call, found on jsonplaceholder.typicode.com
    if (!fs.existsSync(__dirname + tempDownloadDir)) {
        fs.mkdirSync(__dirname+tempDownloadDir, 0744);
        console.log("Directory Doesnt exist, creating one at "+ __dirname+tempDownloadDir);
    }
    fs.writeFileSync(__dirname + tempDownloadDir + useCaseRefNum + '_temp.json'); //Saves api download in atemp folder
    var tempAPIloc = `${tempDownloadDir}${useCaseRefNum}_temp.json`;
    request({
        url: url,
        headers: {
            "Content-Type": "application/json",
        }
    }, function (err, response, body) {
        if (err) {
            getLocalFile();
            console.log("Error: " + err);
            return null;
        }
        if (response.statusCode == 200) {
            let data = response.body;
            var wtableTemp = fs.createWriteStream(__dirname + tempDownloadDir + useCaseRefNum + '_temp.json');
            wtableTemp.write(data); //Writes to temp folder

            //Update local File Function
            updateLocalWithAPI(useCaseRefNum, tempAPIloc);

            var readableAPI = fs.createReadStream(__dirname + `${tempAPIloc}`);
            var compressed = fs.createWriteStream(__dirname + tempDownloadDir + useCaseRefNum + '_temp.json.gz');
            var gzib = zlib.createGzip();
            readableAPI.pipe(gzib).pipe(compressed); //Archives the file using gzip compression
            console.log("Created a compressed copy saved to "+__dirname+tempDownloadDir);
            return data;
        }
    });
}

sapAPIRetriever("es4657d");

function updateLocalWithAPI(useCaseRefNum, apiJsonFileLoc) {
    /** Takes reference number and new Data file as param */
    var oldLocalFile = {
        fileName: 'useCaseRefNum' + '.json',
        filePath: __dirname + `\\${useCaseRefNum}.json`,
    };
    console.log("New file loc: " + apiJsonFileLoc);
    console.log("oldfileloc " + oldLocalFile.filePath);

    if (!fs.existsSync(oldLocalFile.filePath)) { //If Local file is not present, Create a new one
        fs.writeFileSync(oldLocalFile.filePath);
        console.log("Local File was not found, Just created the file");
    }
    var localFileContent = fs.readFileSync(`${oldLocalFile.filePath}`, 'utf8'); //Read old file content
    var liveAPIContent = fs.readFileSync(__dirname + `${apiJsonFileLoc}`, 'utf8'); //Reads new file content

    if (localFileContent != liveAPIContent) {
        // Overwrites a local file if not up to date
        var readableAPI = fs.createReadStream(__dirname + `${apiJsonFileLoc}`);
        var writableLocal = fs.createWriteStream(oldLocalFile.filePath);
        readableAPI.pipe(writableLocal);//Piping a read stream to write stream, writes APi file to local file
        // var fileHandler = fs.createWriteStream(oldLocalFile.filePath);
        // fileHandler.write(liveAPIContent); //Updaes localFile with latest API
        console.log("Local FIle is Succesfully updated");
    }
    else {
        //LocalFileIsUpToDate
        console.log("LOCALFILE IS READY UPTODATE!")
    }
}