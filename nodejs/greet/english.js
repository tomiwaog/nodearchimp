var greetings = require('./greetings.json');

var greet = function(){
    console.log(greetings.en + 'Hello');
}
module.exports = greet;