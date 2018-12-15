person = {
    firstname: 'King/Queen',
    lastname: 'Ogunbamowo',

    greet: function () {
        console.log('firstname is ' + this.firstname + ' and lastname is ' + this.lastname);
    },

    wave: function () {
        return this.firstname+' makes a *hand gesture*';
    }
}

tom = Object.create(person);
tom.firstname = 'Tomiwa';
tom.lastname = 'Ogun';
tom.greet();
console.log(tom.wave());

titi = Object.create(person);
titi.greet(); //Uses default prototype values
console.log(titi.wave());