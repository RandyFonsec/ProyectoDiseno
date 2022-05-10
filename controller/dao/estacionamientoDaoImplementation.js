//const db = require ('./controller/dao/dbconnection');
const db = require ('./dbconnection');
const DAO = require ('./dao');

class EstacionamientoDaoImplementation extends DAO {

    static instanciaSingletonDaoEstacionamiento;

    constructor () {
        if (!EstacionamientoDaoImplementation.instanciaSingletonDaoEstacionamiento) {
            super();
            EstacionamientoDaoImplementation.instanciaSingletonDaoEstacionamiento = this;
        }
        return EstacionamientoDaoImplementation.instanciaSingletonDaoEstacionamiento;
    }

    create (objeto) {
        const insertEstacionamiento = 'INSERT INTO Estacionamiento (identificador, ubicacion, horaApertura, horaCierre, idTipoEstacionamiento) VALUES (?, ?, ?, ?, ?);';
        db.query (insertEstacionamiento, [objeto.identificador, objeto.ubicacion, objeto.horarioApertura, objeto.horarioCierre, objeto.tipoEstacionamiento], function(err, result) {
            if (err) {
                console.log (err);
            }
            else {
                console.log("Estacionamiento Id:- " + result.insertId); }
        }
    );
    }

}

module.exports = EstacionamientoDaoImplementation;