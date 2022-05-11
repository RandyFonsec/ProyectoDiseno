const FuncionarioDaoImplementation = require('./dao/funcionarioDaoImplementation');
const UtilsDaoImplementation = require('./dao/utilsDaoImplementation');
const funcionarioDaoImplementation = new FuncionarioDaoImplementation();
const utilsDaoImplementation = new UtilsDaoImplementation();

class GestorFuncionarios {

    constructor() {}

    agregarFuncionario(funcionario) {
        const resultado = funcionarioDaoImplementation.create(funcionario);
        return resultado != undefined ? true : false;
    }

    obtenerFuncionarios() {
        const resultado = funcionarioDaoImplementation.getAll();
        return resultado;
    }

    obtenerFuncionario(key) {
        const resultado = funcionarioDaoImplementation.get(key);
        return resultado;
    }

    modificarFuncionario(funcionario) {
        const resultado = funcionarioDaoImplementation.update(funcionario);
        return resultado;
    }

    eliminarFuncionario(identificacion) {
        const resultado = funcionarioDaoImplementation.delete(identificacion);
        return resultado;
    }

    validarFuncionario(correo, contrasenna) {
        const resultado = funcionarioDaoImplementation.get(correo, contrasenna);
        return resultado;
    }

    obtenerDepartamentos() {
        const resultado = utilsDaoImplementation.getDepartamentos();
        return resultado;
    }

    obtenePlacas(identificacion) {
        const resultado = utilsDaoImplementation.getPlacas(identificacion);
        return resultado;
    }
}

module.exports = GestorFuncionarios;