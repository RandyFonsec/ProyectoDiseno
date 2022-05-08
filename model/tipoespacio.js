class TipoEspacio {

    static DISCAPACITADO = new TipoEspacio ("Discapacitado")
    static JEFATURA = new TipoEspacio ("Jefatura") 
    static VEHICULO_OFICIAL = new TipoEspacio ("Vehículo oficial") 
    static VISITANTE = new TipoEspacio ("Visitante") 
    
    constructor (tipoEspacio) {
        this.tipoEspacio = tipoEspacio;
    }

}