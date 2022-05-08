class HorarioServicio {

    constructor (horaApertura, horaCierre) {
        this.horaApertura = horaApertura;
        this.horaCierre = horaCierre;
    } 

    getHoraApertura () {
        return this.horaApertura;
    }

    setHoraApertura (horaApertura) {
        this.horaApertura = horaApertura;
    } 

    getHoraCierre () {
        return this.horaCierre;
    }

    setHoraCierre (horaCierre) {
        this.horaCierre = horaCierre;
    }

}