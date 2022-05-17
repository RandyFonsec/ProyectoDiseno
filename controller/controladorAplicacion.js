const GestorEstacionamientos = require('./gestorEstacionamientos');
const GestorFuncionarios = require('./gestorFuncionarios')

class ControladorAplicacion {

    static instanciaSingletonControlador;
    gestorFuncionarios;
    gestorEstacionamientos;

    constructor() {
        if (!ControladorAplicacion.instanciaSingletonControlador) {
            ControladorAplicacion.instanciaSingletonControlador = this;
            this.gestorEstacionamientos = new GestorEstacionamientos();
            this.gestorFuncionarios = new GestorFuncionarios();
        }
        return ControladorAplicacion.instanciaSingletonControlador;
    }

    agregarFuncionario(funcionario) {
        return this.gestorFuncionarios.agregarFuncionario(funcionario);
    }

    obtenerFuncionarios() {
        return this.gestorFuncionarios.obtenerFuncionarios();
    }

    obtenerFuncionario(key) {
        return this.gestorFuncionarios.obtenerFuncionario(key);
    }

    modificarFuncionario(funcionario) {
        return this.gestorFuncionarios.modificarFuncionario(funcionario);
    }

    eliminarFuncionario(identificacion) {
        return this.gestorFuncionarios.eliminarFuncionario(identificacion);
    }

    validarFuncionario(correo, contrasenna) {
        return this.gestorFuncionarios.validarFuncionario(correo, contrasenna);
    }

    validarRegistroFuncionario (identificacion, correo) {
        return this.gestorFuncionarios.validarRegistroFuncionario(identificacion, correo) ;
    }

    agregarEstacionamiento(estacionamiento) {
        return this.gestorEstacionamientos.agregarEstacionamiento(estacionamiento);
    }

    modificarEstacionamiento(estacionamiento) {
        return this.gestorEstacionamientos.modificarEstacionamiento(estacionamiento);
    }

    obtenerEstacionamientos() {
        return this.gestorEstacionamientos.obtenerEstacionamientos();
    }

    obtenerEstacionamiento(key) {
        return this.gestorEstacionamientos.obtenerEstacionamiento(key);
    }

    eliminarEstacionamiento(identificador) {
        return this.gestorEstacionamientos.eliminarEstacionamiento(identificador);
    }

    obtenerDepartamentos() {
        return this.gestorFuncionarios.obtenerDepartamentos();
    }

    obtenerTiposEstacionamiento() {
        return this.gestorEstacionamientos.obtenerTiposEstacionamiento();
    }

    obtenerEspacio(identificador) {
        return this.gestorEstacionamientos.obtenerEspacio(identificador);
    }

    obtenerEspacios(idEstacionamiento) {
        return this.gestorEstacionamientos.obtenerEspacios(idEstacionamiento);
    }

    obtenerTiposEspacio() {
        return this.gestorEstacionamientos.obtenerTiposEspacio();
    }

    obtenerPlacas(identificacion) {
        return this.gestorFuncionarios.obtenerPlacas(identificacion);
    }


    agregarEspacio(espacio) {
        return this.gestorEstacionamientos.agregarEspacio(espacio);
    }

    modificarEspacio(espacio) {
        return this.gestorEstacionamientos.modificarEspacio(espacio);
    }

    eliminarEspacio(identificador) {
        return this.gestorEstacionamientos.eliminarEspacio(identificador);
    }

    eliminarPlaca(idFuncionario, idPlaca) {
        return this.gestorFuncionarios.eliminarPlaca(idFuncionario, idPlaca);
    }

    agregarPlaca(idFuncionario, idPlaca) {
        return this.gestorFuncionarios.agregarPlaca(idFuncionario, idPlaca);
    }

    crearFranja(lista) {
        return this.gestorFuncionarios.crearFranja(lista);
    }

    getCantidadxFranja(franja) {
        return this.gestorFuncionarios.getCantidadxFranja(franja);
    }
    obtenerEstacionamientosConTipo() {
        return this.gestorEstacionamientos.obtenerEstacionamientosConTipo();
    }

    obtenerDepartamento(idDepartamento) {
        return this.gestorFuncionarios.obtenerDepartamento(idDepartamento);

    }

    obtenerTipoFuncionario(idTipoFuncionario) {
        return this.gestorFuncionarios.obtenerTipoFuncionario(idTipoFuncionario);
    }

    obtenerFuncionariosTotal() {
        return this.gestorFuncionarios.obtenerFuncionariosTotal();
    }


    obtenerFuncionarioTotal(idFuncionario) {
        return this.gestorFuncionarios.obtenerFuncionarioTotal(idFuncionario);
    }

    obtenerFuncionariosxDepartamento(idDepartamento) {
        return this.gestorFuncionarios.obtenerFuncionariosxDepartamento(idDepartamento);
    }
}

module.exports = ControladorAplicacion;