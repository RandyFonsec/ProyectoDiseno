const FuncionarioDaoImplementation = require ('./dao/funcionarioDaoImplementation');
const funcionarioDaoImplementation = new FuncionarioDaoImplementation();

class GestorFuncionarios {

    constructor () {}

    agregarFuncionario (funcionario) {
        const resultado = funcionarioDaoImplementation.create (funcionario);
        return resultado != undefined ? true : false;
    }

}

module.exports = GestorFuncionarios;