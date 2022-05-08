class TipoFuncionario {

    static ADMINISTRATIVO = new TipoFuncionario ("Administrativo")
    static DOCENTE = new TipoFuncionario ("Docente") 

    constructor (tipoFuncionario) {
        this.tipoFuncionario = tipoFuncionario;
    }

}