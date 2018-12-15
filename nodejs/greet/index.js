var english = require('./english');


module.exports = {
    english: english,
    spanish: require('./spanish'),
    german: function(){
        console.log('Halo');
}}
