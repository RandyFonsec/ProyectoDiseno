class EstacionamientoExterno extends Estacionamiento {
    
    constructor (identificador, ubicacion, espacios, horarioServicio, telefonoAdministrador) {
        super(identificador, ubicacion, espacios, horarioServicio);
        this.telefonoAdministrador = telefonoAdministrador;
    }

    getTelefonoAdministrador () {
        return this.telefonoAdministrador;
    }
    
    setTelefonoAdministrador (telefonoAdministrador) {
        this.telefonoAdministrador = telefonoAdministrador;
    }

}