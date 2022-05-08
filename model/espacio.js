class Espacio {

    constructor (identificador, reservado) {
        this.identificador = identificador;
        this.reservado = reservado;
    }

    getIdentificador () {
        return this.identificador;
    }

    setIdentificador (identificador) {
        this.identificador = identificador;
    }

    isReservado () {
        return this.reservado;
    }

    setReservado (reservado) {
        this.reservado = reservado;
    }

}