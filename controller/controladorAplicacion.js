const GestorEstacionamientos = require ('./gestorEstacionamientos');
const GestorFuncionarios = require ('./gestorFuncionarios')

class ControladorAplicacion {

    static instanciaSingletonControlador;
    gestorFuncionarios;
    gestorEstacionamientos;

    constructor () {
        if (!ControladorAplicacion.instanciaSingletonControlador) {
            ControladorAplicacion.instanciaSingletonControlador = this;
            this.gestorEstacionamientos = new GestorEstacionamientos ();
            this.gestorFuncionarios = new GestorFuncionarios ();
        }
        return ControladorAplicacion.instanciaSingletonControlador;
    }

    agregarFuncionario (funcionario) {
        return this.gestorEstacionamientos.agregarFuncionario (funcionario);
    }

}
