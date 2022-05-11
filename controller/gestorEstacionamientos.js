const EstacionamientoDaoImplementation = require ('./dao/estacionamientoDaoImplementation');
const estacionamientoDaoImplementation = new EstacionamientoDaoImplementation();

class GestorEstacionamientos {

    constructor () {}

    agregarEstacionamiento (estacionamiento) {
        const resultado = estacionamientoDaoImplementation.create (estacionamiento);
        return resultado != undefined ? true : false;
    }

    modificarEstacionamiento (estacionamiento) {
        const resultado = estacionamientoDaoImplementation.update (estacionamiento);
        return resultado != undefined ? true : false;
    }

    obtenerEstacionamientos() {
        const resultado = estacionamientoDaoImplementation.getAll ();
        return resultado;
    }

    obtenerEstacionamiento(key) {
        const resultado = estacionamientoDaoImplementation.get (key);
        return resultado;
    }

    eliminarEstacionamiento (identificador) {
        const resultado = estacionamientoDaoImplementation.delete (identificador);
        return resultado;
    }

}

module.exports = GestorEstacionamientos;