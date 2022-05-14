//const db = require ('./controller/dao/dbconnection');
const db = require('./dbconnection');
const DAO = require('./dao');

class EstacionamientoDaoImplementation extends DAO {

    static instanciaSingletonDaoEstacionamiento;

    constructor() {
        if (!EstacionamientoDaoImplementation.instanciaSingletonDaoEstacionamiento) {
            super();
            EstacionamientoDaoImplementation.instanciaSingletonDaoEstacionamiento = this;
        }
        return EstacionamientoDaoImplementation.instanciaSingletonDaoEstacionamiento;
    }

    create(objeto) {
        const insertEstacionamiento = 'INSERT INTO Estacionamiento (identificador, ubicacion, horaApertura, horaCierre, idTipoEstacionamiento) VALUES (?, ?, ?, ?, ?);';
        db.query(insertEstacionamiento, [objeto.identificador, objeto.ubicacion, objeto.horarioApertura, objeto.horarioCierre, objeto.tipoEstacionamiento], function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Estacionamiento Id:- " + result.insertId);
            }
        });
    }

    update(objeto) {
        const updateEstacionamiento = 'UPDATE Estacionamiento SET identificador = ?, ubicacion = ?, horaApertura = ?, horaCierre = ?, idTipoEstacionamiento = ? WHERE identificador = ?';
        return db.query(updateEstacionamiento, [objeto.identificador, objeto.ubicacion, objeto.horarioApertura, objeto.horarioCierre, objeto.tipoEstacionamiento, objeto.identificador]);
    }

    getAll() {
        const selectEstacionamiento = 'SELECT * FROM Estacionamiento WHERE eliminado = 0';
        return db.query(selectEstacionamiento);
    }

    get(key) {
        const selectEstacionamiento = 'SELECT * FROM Estacionamiento WHERE identificador = ?;';
        return db.query(selectEstacionamiento, [key]);
    }


    delete(key) {
        const updateEstacionamiento = 'UPDATE Estacionamiento SET eliminado = 1 WHERE identificador = ?';
        return db.query(updateEstacionamiento, [key]);
    }

    getTiposEstacionamiento() {
        return db.query('SELECT * FROM TipoEstacionamiento;');
    }
    obtenerEstacionamientosConTipo() {
        const query = "SELECT e.identificador, e.ubicacion, e.horaApertura, e.horaCierre,e.eliminado,t.tipoEstacionamiento FROM Estacionamiento AS e INNER JOIN TipoEstacionamiento AS t ON t.idTipoEstacionamiento = e.idTipoEstacionamiento WHERE e.eliminado = 0;";
        return db.query(query);
    }
}

module.exports = EstacionamientoDaoImplementation;