function Emitter() {
    this.events = {
        'greets': []
    };
}

Emitter.prototype.on = function (type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
}
Emitter.prototype.emit = function (type) {
    if (this.events[type]) {
        var arr = this.events[type];
        arr.forEach(function (listener) {
            listener();
        });
    }
}
module.exports = Emitter;