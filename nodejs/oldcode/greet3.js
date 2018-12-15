function Greetr(){
    this.greeting = 'Running Greet3!!';
    this.greet = function(){
        console.log(this.greeting);
    }
}

module.exports = new Greetr();