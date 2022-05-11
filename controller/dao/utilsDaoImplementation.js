//const db = require ('./controller/dao/dbconnection');
const db = require('./dbconnection');
const DAO = require('./dao');

class UtilsDaoImplementation extends DAO {

    static instanciaSingletonDaoUtils;

    constructor() {
        if (!UtilsDaoImplementation.instanciaSingletonDaoUtils) {
            super();
            UtilsDaoImplementation.instanciaSingletonDaoFuncionario = this;
        }
        return UtilsDaoImplementation.instanciaSingletonDaoUtils;
    }


    getDepartamentos() {
        return db.query('SELECT * FROM Departamento');
    }

    getTiposEstacionamiento() {
        return db.query('SELECT * FROM TipoEstacionamiento');
    }

    getPlacas(identificacion) {
        return db.query('SELECT * FROM Placa WHERE idFuncionario = (SELECT idFuncionario from Funcionario WHERE identificacion = ?)', [identificacion]);
    }


}

module.exports = UtilsDaoImplementation;