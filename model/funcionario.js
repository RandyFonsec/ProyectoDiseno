class Funcionario {

    constructor (identificacion, tipoFuncionario, nombreCompleto, correoInstitucional, correoAlterno, 
                departamento, franjasHorarias, placasAutorizadas, jefe, discapacidad, numeroCelular, 
                notificacionesAlternas) {
        this.identificacion = identificacion;
        this.tipoFuncionario = tipoFuncionario;
        this.nombreCompleto = nombreCompleto;
        this.correoInstitucional = correoInstitucional;
        this.correoAlterno = correoAlterno;
        this.departamento = departamento;
        this.franjasHorarias = franjasHorarias;
        this.placasAutorizadas = placasAutorizadas;
        this.jefe = jefe;
        this.dispacitado = discapacidad;
        this.numeroCelular = numeroCelular;
        this.notificacionesAlternas = notificacionesAlternas;                
    }

    getIdentificacion () {
        return this.identificacion;
    }

    setIdentificacion (identificacion) {
        this.identificacion = identificacion;
    }

    getTipoFuncionario () {
        return this.tipoFuncionario;
    }

    setTipoFuncionario (tipoFuncionario) {
        this.tipoFuncionario = tipoFuncionario;
    }

    getNombreCompleto () {
        return this.nombreCompleto;
    }

    setNombreCompleto (nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    getCorreoInstitucional () {
        return this.correoInstitucional;
    }

    setCorreoInstitucional (correoInstitucional) {
        this.correoInstitucional = correoInstitucional;
    }

    getCorreoAlterno () {
        return this.correoAlterno;
    }

    setCorreoAlterno (correoAlterno) {
        this.correoAlterno = correoAlterno;
    }

    getDepartamento () {
        return this.departamento;
    }

    setDepartamento (departamento) {
        this.departamento = departamento;
    }

    getFranjasHorarias () {
        return this.franjasHorarias;
    }

    setFranjasHorarias (franjasHorarias) {
        this.franjasHorarias = franjasHorarias;
    }

    getPlacasAutorizadas () {
        return this.placasAutorizadas;
    }

    setPlacasAutorizadas (placasAutorizadas) {
        this.placasAutorizadas = placasAutorizadas;
    }

    isJefe () {
        return this.jefe;
    }

    setJefe (jefe) {
        this.jefe = jefe;
    }

    isDispacitado () {
        return this.dispacitado;
    }

    setDiscapacitado (dispacitado) {
        this.dispacitado = dispacitado;
    }

    getNumeroCelular () {
        return this.numeroCelular;
    }

    setNumeroCelular (numeroCelular) {
        this.numeroCelular = numeroCelular;
    }

    isNotificacionesAlternas () {
        return this.notificacionesAlternas;
    }

    setNotificacionesAlternas (notificacionesAlternas) {
        this.notificacionesAlternas = notificacionesAlternas;
    }

}