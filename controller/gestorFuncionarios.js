const res = require('express/lib/response');
const EstacionamientoDaoImplementation = require('./dao/estacionamientoDaoImplementation');
const FuncionarioDaoImplementation = require('./dao/funcionarioDaoImplementation');
const UtilsDaoImplementation = require('./dao/utilsDaoImplementation');

const funcionarioDaoImplementation = new FuncionarioDaoImplementation();
const utilsDaoImplementation = new UtilsDaoImplementation();

class GestorFuncionarios {

    constructor() {}

    agregarFuncionario(funcionario) {
        const resultado = funcionarioDaoImplementation.create(funcionario);
        return resultado != undefined ? true : false;
    }

    obtenerFuncionarios() {
        const resultado = funcionarioDaoImplementation.getAll();
        return resultado;
    }

    obtenerFuncionario(key) {
        const resultado = funcionarioDaoImplementation.get(key);
        return resultado;
    }

    modificarFuncionario(funcionario) {
        const resultado = funcionarioDaoImplementation.update(funcionario);
        return resultado;
    }

    eliminarFuncionario(identificacion) {
        const resultado = funcionarioDaoImplementation.delete(identificacion);
        return resultado;
    }

    validarFuncionario(correo, contrasenna) {
        const resultado = funcionarioDaoImplementation.getByMail(correo, contrasenna);
        return resultado;
    }

    validarRegistroFuncionario(identificacion, correo) {
        const resultado = funcionarioDaoImplementation.validarRegistroFuncionario(identificacion, correo);
        return resultado;
    }

    obtenerDepartamentos() {
        const resultado = utilsDaoImplementation.getDepartamentos();
        return resultado;
    }

    obtenerPlacas(identificacion) {
        const resultado = utilsDaoImplementation.getPlacas(identificacion);
        return resultado;
    }

    eliminarPlaca(idFuncionario, idPlaca) {
        const resultado = utilsDaoImplementation.deletePlaca(idFuncionario, idPlaca);
        return resultado.length != 0;
    }

    agregarPlaca(idFuncionario, idPlaca) {
        const resultado = utilsDaoImplementation.createPlaca(idFuncionario, idPlaca);
        return resultado.length != 0;
    }

    validarRegistroPlaca(placa) {
        const resultado = utilsDaoImplementation.validarRegistroPlaca(placa)
        return resultado;
    }

    obtenerFranjas(idFuncionario) {
        return utilsDaoImplementation.getFranjas(idFuncionario);
    }

    crearFranja(lista) {
        const resultado = utilsDaoImplementation.createFranja(lista);
        return resultado.length != 0;
    }

    getCantidadxFranja(franja) {
        return utilsDaoImplementation.getCantidadxFranja(franja);
    }

    actualizarFranjas(lista) {
        return utilsDaoImplementation.updateFranjas(lista)
    }

    obtenerDepartamento(idDepartamento) {
        return utilsDaoImplementation.getDepartamento(idDepartamento);
    }

    obtenerTipoFuncionario(idTipoFuncionario) {
        return utilsDaoImplementation.getTipoFuncionario(idTipoFuncionario);
    }

    obtenerFuncionariosTotal() {
        return funcionarioDaoImplementation.getAllTotal();
    }

    obtenerFuncionarioTotal(idFuncionario) {
        return funcionarioDaoImplementation.getTotal(idFuncionario);
    }

    obtenerFuncionariosxDepartamento(idDepartamento) {
        return funcionarioDaoImplementation.getByDepartamento(idDepartamento);
    }

    obtenerOperadores() {
        return funcionarioDaoImplementation.obtenerOperadores();
    }

    validarHorario(id, dia, horario, tipoUsuario) {
        return utilsDaoImplementation.validarHorario(id, dia, horario, tipoUsuario);
    }
}

module.exports = GestorFuncionarios;