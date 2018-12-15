function greet(callbackFunction){
    console.log("Greet intro");
    var data = {
        name: 'Tomiwa Ogunbamowo'
    }
    callbackFunction(data);
}


greet(function(data){
    console.log("Running call-back function");
    console.log(data);
})

greet(function(another){
    console.log("Running another call-back function");
    console.log(`Testing a template literal '${another.name}' and it worked`);
})