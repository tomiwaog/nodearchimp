function Greetr(){
    this.greeting = 'Running Original GReeter!!';
    this.greet = function(){
        console.log(this.greeting);
    }
}

module.exports = Greetr;