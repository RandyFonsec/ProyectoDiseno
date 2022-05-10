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

    agregarEstacionamiento (estacionamiento) {
        return this.gestorEstacionamientos.agregarEstacionamiento (estacionamiento);
    }

    modificarEstacionamiento (estacionamiento) {
        return this.gestorEstacionamientos.modificarEstacionamiento (estacionamiento);
    }

    obtenerEstacionamientos () {
        return this.gestorEstacionamientos.obtenerEstacionamientos ();
    }

    obtenerEstacionamiento (key) {
        return this.gestorEstacionamientos.obtenerEstacionamiento (key);
    }

    eliminarEstacionamiento (identificador) {
        return this.gestorEstacionamientos.eliminarEstacionamiento (identificador);
    }

}

module.exports = ControladorAplicacion;