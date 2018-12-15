var Emitter = require('events');

var obj1 = new Emitter();
obj1.on('greet', function(){
    console.log('Some is greeting someone somewhere!')
})

obj1.on('greet', function(){
    console.log('Again, Some is greeting someone somewhere!')
})

obj1.emit('greet');