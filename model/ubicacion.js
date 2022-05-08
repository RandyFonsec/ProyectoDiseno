class Ubicacion {

    constructor (latitud, longitud, sennas) {
        this.latitud = latitud;
        this.longitud = longitud;
        this.sennas = sennas;
    }

    getLatitud () {
        return this.latitud;
    }

    setLatitud (latitud) {
        this.latitud = latitud;
    }

    getLongitud () {
        return this.longitud;
    }

    setLongitud (longitud) {
        this.longitud = longitud;
    }

    getSennas () {
        return this.sennas;
    }

    setSennas (sennas) {
        this.sennas = sennas;
    }

}