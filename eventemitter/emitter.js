function Emitter(){
    this.events = {};
}

Emitter.prototype.on = function(type, listener){
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
    //same concept
    //this.events['greet'].push(listener);
}


Emitter.prototype.emit = function(type){
    if (this.events[type]){
        var myarr = this.events[type];
        myarr.forEach(function(listenerElem){
            listenerElem.apply(this);
        });
    }
}

module.exports = Emitter;