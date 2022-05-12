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
        return db.query('SELECT * FROM Placa WHERE idFuncionario = (SELECT idFuncionario from Funcionario WHERE identificacion = ?) AND eliminada = 0', [identificacion]);
    }

    deletePlaca(idFuncionario, idPlaca) {
        return db.query('UPDATE Placa SET eliminada = 1 WHERE idFuncionario = ? AND idPlaca = ?', [idFuncionario, idPlaca]);
    }

    createPlaca(idFuncionario, idPlaca) {
        return db.query('INSERT INTO Placa(placa, idFuncionario) VALUES (?,?)', [idPlaca, idFuncionario]);
    }

    createFranja(lista) {
        const result = db.query('INSERT INTO FranjaHoraria(dia,horario,activo,idFuncionario) VALUES ?', [lista]);

        return result;
    }

    getCantidadxFranja(dia) {


        return db.query('SELECT dia, COUNT(*) AS cantidad FROM FranjaHoraria WHERE horario = ? AND activo = 1 group by dia;', [dia]);

    }

}

module.exports = UtilsDaoImplementation;