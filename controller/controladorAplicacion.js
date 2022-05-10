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
    agregarEstacionamiento(estacionamiento) {
        return this.gestorEstacionamientos.agregarEstacionamiento(estacionamiento);
    }

    validarFuncionario(correo, contrasenna) {
        return this.gestorFuncionarios.validarFuncionario(correo, contrasenna);
    }

}

module.exports = ControladorAplicacion;