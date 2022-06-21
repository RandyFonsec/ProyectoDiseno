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

    obtenerEspaciosPorTipo(fecha, horario, idEstacionamiento, tipoEspacio) {
        const resultado = utilsDaoImplementation.getEspaciosPorTipo(fecha, horario, idEstacionamiento, tipoEspacio);
        return resultado;
    }
    obtenerEspacios(id) {
        const resultado = utilsDaoImplementation.getEspacios(id);
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


    validarRegistroEstacionamiento(identificador) {
        const resultado = estacionamientoDaoImplementation.validarRegistroEstacionamiento(identificador);
        return resultado;
    }

    obtenerEspacioReservado(idEspacio, fecha, dia, horario) {
        const resultado = utilsDaoImplementation.obtenerEspacioReservado(idEspacio, fecha, dia, horario);
        return resultado;
    }
    crearReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva) {
        const resultado = utilsDaoImplementation.crearReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva);
        return resultado;
    }

    actualizarReservacion(identificacion, idEspacio, fecha, dia, horario) {
        const resultado = utilsDaoImplementation.actualizarReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva);
        return resultado;
    }

    obtenerReservacionesEnRango(identificacion, desde, hasta) {
        const resultado = utilsDaoImplementation.obtenerReservacionesEnRango(identificacion, desde, hasta);
        return resultado;
    }

    obtenerEspaciosVisitas(idEstacionamiento) {
        const resultado = utilsDaoImplementation.obtenerEspaciosVisitas(idEstacionamiento);
        return resultado;
    }

    reservarEspacio(idEspacio) {
        const resultado = utilsDaoImplementation.reservarEspacio(idEspacio);
        return resultado;
    }

    registrarVisita(objeto) {
        const resultado = utilsDaoImplementation.registrarVisita(objeto);
        return resultado;
    }
    obtenerEstacionamientoPorEncargado(idOperador) {
        const resultado = estacionamientoDaoImplementation.obtenerEstacionamientoPorEncargado(idOperador);
        return resultado;
    }

    obtenerReservacionesPorEstacionamiento(idEstacionamiento) {
        const resultado = utilsDaoImplementation.obtenerReservacionesPorEstacionamiento(idEstacionamiento);
        return resultado;
    }
    obtenerRe
}

module.exports = GestorEstacionamientos;