class EstacionamientoPropio extends Estacionamiento {
    
    constructor (identificador, ubicacion, espacios, horarioServicio, tipoCampus) {
        super(identificador, ubicacion, espacios, horarioServicio);
        this.tipoCampus = tipoCampus;
    }

    getTipoCampus () {
        return this.tipoCampus;
    }
    
    setTipoCampus (tipoCampus) {
        this.tipoCampus = tipoCampus;
    }

}