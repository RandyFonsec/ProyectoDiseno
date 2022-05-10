const EstacionamientoDaoImplementation = require ('./dao/estacionamientoDaoImplementation');
const estacionamientoDaoImplementation = new EstacionamientoDaoImplementation();

class GestorEstacionamientos {

    constructor () {}

    agregarEstacionamiento (estacionamiento) {
        const resultado = estacionamientoDaoImplementation.create (estacionamiento);
        return resultado != undefined ? true : false;
    }

}

module.exports = GestorEstacionamientos;