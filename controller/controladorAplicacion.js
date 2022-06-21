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

    validarOperador(nombreUsuario, contrasenna) {
        return this.gestorFuncionarios.validarOperador(nombreUsuario, contrasenna);
    }

    validarRegistroFuncionario(identificacion, correo) {
        return this.gestorFuncionarios.validarRegistroFuncionario(identificacion, correo);
    }

    validarRegistroEstacionamiento(identificador) {
        return this.gestorEstacionamientos.validarRegistroEstacionamiento(identificador);
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
    obtenerEspacios(id) {
        return this.gestorEstacionamientos.obtenerEspacios(id);
    }

    obtenerEspaciosPorTipo(fecha, horario, idEstacionamiento, tipoEspacio) {
        return this.gestorEstacionamientos.obtenerEspaciosPorTipo(fecha, horario, idEstacionamiento, tipoEspacio);
    }



    obtenerTiposEspacio() {
        return this.gestorEstacionamientos.obtenerTiposEspacio();
    }

    obtenerPlacas(identificacion) {
        return this.gestorFuncionarios.obtenerPlacas(identificacion);
    }

    validarRegistroPlaca(placa) {
        return this.gestorFuncionarios.validarRegistroPlaca(placa);
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
    obtenerFranjas(idFuncionario) {
        return this.gestorFuncionarios.obtenerFranjas(idFuncionario);
    }
    crearFranja(lista) {
        return this.gestorFuncionarios.crearFranja(lista);
    }

    getCantidadxFranja(franja) {
        return this.gestorFuncionarios.getCantidadxFranja(franja);
    }

    actualizarFranjas(lista) {
        return this.gestorFuncionarios.actualizarFranjas(lista);
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

    obtenerOperadores() {
        return this.gestorFuncionarios.obtenerOperadores();
    }
    validarHorario(id, dia, horario, tipoUsuario) {

        return this.gestorFuncionarios.validarHorario(id, dia, horario, tipoUsuario);
    }

    obtenerEspacioReservado(idEspacio, fecha, dia, horario) {
        return this.gestorEstacionamientos.obtenerEspacioReservado(idEspacio, fecha, dia, horario);
    }
    crearReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva) {
        return this.gestorEstacionamientos.crearReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva);
    }
    actualizarReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva) {
        return this.gestorEstacionamientos.actualizarReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva);
    }

    obtenerReservacionesEnRango(identificacion, desde, hasta) {
        return this.gestorEstacionamientos.obtenerReservacionesEnRango(identificacion, desde, hasta);
    }


    obtenerEspaciosVisitas(idEstacionamiento) {
        return this.gestorEstacionamientos.obtenerEspaciosVisitas(idEstacionamiento);
    }

    reservarEspacio(idEspacio) {
        return this.gestorEstacionamientos.reservarEspacio(idEspacio);
    }

    registrarVisita(objeto) {
        return this.gestorEstacionamientos.registrarVisita(objeto);
    }

    obtenerEstacionamientoPorEncargado(idOperador) {
        return this.gestorEstacionamientos.obtenerEstacionamientoPorEncargado(idOperador);

    }

    obtenerReservacionesPorEstacionamiento(idEstacionamiento) {
        return this.gestorEstacionamientos.obtenerReservacionesPorEstacionamiento(idEstacionamiento);
    }
}

module.exports = ControladorAplicacion;