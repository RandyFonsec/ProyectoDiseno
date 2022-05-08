class Estacionamiento {

    constructor (identificador, ubicacion, espacios, horarioServicio) {
        this.identificador = identificador;
        this.ubicacion = ubicacion;
        this.espacios = espacios;
        this.horarioServicio = horarioServicio;
    }

    getIdentificador () {
        return this.identificador;
    }

    setIdentificador (identificador) {
        this.identificador = this.identificador;
    }

    getUbicacion () {
        return this.ubicacion;
    }

    setUbicacion (ubicacion) {
        this.ubicacion = ubicacion;
    }

    getEspacios () {
        return this.espacios; 
    }

    setEspacios (espacios) {
        this.espacios = espacios;
    }

    getHorarioServicio () {
        return this.horarioServicio;
    }

    setHorarioServicio (horarioServicio) {
        this.horarioServicio = horarioServicio;
    }

}