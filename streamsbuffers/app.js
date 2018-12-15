var fs = require('fs');

var writable = fs.createWriteStream(__dirname+'/myfile.txt');
writable.write('Hello');
writable.write('Hiya');
writable.write('Hello');