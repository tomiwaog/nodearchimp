var arr = [];

arr.push(function(){
    console.log("Item 1");
})

arr.push(function(){
    console.log("Item 2");
})

arr.push(function(){
    console.log("Item 3");
})

arr.forEach(element => {
    element();
});

//Arrow functions in ECMAscript6 only (not valid in normal JS)
arr.forEach(function(element2){
    element2();
})

