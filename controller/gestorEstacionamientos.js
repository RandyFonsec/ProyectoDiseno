const EstacionamientoDaoImplementation = require('./dao/estacionamientoDaoImplementation');
const UtilsDaoImplementation = require('./dao/utilsDaoImplementation');
const estacionamientoDaoImplementation = new EstacionamientoDaoImplementation();
const utilsDaoImplementation = new UtilsDaoImplementation();
class GestorEstacionamientos {

    constructor() {}

    agregarEstacionamiento(estacionamiento) {
        const resultado = estacionamientoDaoImplementation.create(estacionamiento);
        return resultado != undefined ? true : false;
    }

    modificarEstacionamiento(estacionamiento) {
        const resultado = estacionamientoDaoImplementation.update(estacionamiento);
        return resultado != undefined ? true : false;
    }

    obtenerEstacionamientos() {
        const resultado = estacionamientoDaoImplementation.getAll();
        return resultado;
    }

    obtenerEstacionamiento(key) {
        const resultado = estacionamientoDaoImplementation.get(key);
        return resultado;
    }

    eliminarEstacionamiento(identificador) {
        const resultado = estacionamientoDaoImplementation.delete(identificador);
        return resultado;
    }

    obtenerTiposEstacionamiento() {
        const resultado = utilsDaoImplementation.getTiposEstacionamiento();
        return resultado;
    }

    obtenerEspacio(identificador) {
        const resultado = utilsDaoImplementation.getEspacio(identificador);
        return resultado;
    }

    obtenerEspacios(idEstacionamiento) {
        const resultado = utilsDaoImplementation.getEspacios(idEstacionamiento);
        return resultado;
    }

    obtenerTiposEspacio() {
        const resultado = utilsDaoImplementation.getTiposEspacio();
        return resultado;
    }

    agregarEspacio(espacio) {
        const resultado = utilsDaoImplementation.createEspacio(espacio);
        return resultado;
    }

    modificarEspacio(espacio) {
        const resultado = utilsDaoImplementation.updateEspacio(espacio);
        return resultado;
    }

    eliminarEspacio(espacio) {
        const resultado = utilsDaoImplementation.deleteEspacio(espacio);
        return resultado;
    }

    obtenerEstacionamientosConTipo() {
        const resultado = estacionamientoDaoImplementation.obtenerEstacionamientosConTipo();
        return resultado;
    }

    obtenerEstacionamientosConTipo () {
        const resultado = estacionamientoDaoImplementation.obtenerEstacionamientosConTipo() ;
        return resultado ;
    }

    validarRegistroEstacionamiento (identificador) {
        const resultado = estacionamientoDaoImplementation.validarRegistroEstacionamiento (identificador) ;
        return resultado ;
    }

}

module.exports = GestorEstacionamientos;