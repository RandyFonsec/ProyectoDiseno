class Persona {
    nombre = "" ;

    constructor (apellido, id) {
        this.apellido = apellido;
        this.id = id;
    }

}

let p = new Persona("Cascante", 123);
console.log(p);