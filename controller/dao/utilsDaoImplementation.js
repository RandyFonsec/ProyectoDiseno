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

    getDepartamento(idDepartamento) {
        return db.query('SELECT * FROM Departamento WHERE idDepartamento = ?', [idDepartamento]);
    }

    getTipoFuncionario(idTipoFuncionario) {
        return db.query("SELECT * FROM TipoFuncionario WHERE idTipoFuncionario = ?", [idTipoFuncionario]);
    }
    getTiposEstacionamiento() {
        return db.query('SELECT * FROM TipoEstacionamiento');
    }

    getEstacionamientosConTipo () {
        const selectEstacionamientosTipo = 'SELECT identificador as \'Identificador\', ubicacion as \'Ubicación\', horaApertura as \'Hora de apertura\', horaCierre as \'Hora de cierre\', tipoEstacionamiento as \'Tipo de estacionamiento\' FROM Estacionamiento INNER JOIN TipoEstacionamiento ON Estacionamiento.idTipoEstacionamiento = TipoEstacionamiento.idTipoEstacionamiento WHERE eliminado = 0;';
        return db.query (selectEstacionamientosTipo) ;
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

    getFranjas(idFuncionario) {
        return db.query('SELECT * FROM bgtvabkkjjkeiuxdcsho.FranjaHoraria WHERE idFuncionario = ?;', [idFuncionario]);
    }
    getCantidadxFranja(dia) {
        return db.query('SELECT dia, COUNT(*) AS cantidad FROM FranjaHoraria WHERE horario = ? AND activo = 1 group by dia;', [dia]);
    }

    updateFranjas(lista) {
        var values = lista;
        var queries = '';

        values.forEach(function(item) {
            queries += "UPDATE FranjaHoraria SET activo =" + item[0] + " WHERE dia = '" + item[1] + "' AND horario = '" + item[2] + "' AND idFuncionario = " + item[3] + "; ";
        });
        return db.query(queries);
    }

    getTiposEspacio() {
        return db.query('SELECT * FROM TipoEspacio');
    }

    getEspacio(key) {
        const getEspacio = 'SELECT * FROM Espacio WHERE eliminado = 0 and identificador = ?;';
        return db.query(getEspacio, [key]);
    }

    getEspacios(idEstacionamiento) {
        const getEspacios = 'SELECT * FROM Espacio WHERE eliminado = 0 AND idEstacionamiento = ?;';
        return db.query(getEspacios, [idEstacionamiento]);
    }

    createEspacio (objeto) {
        const insertEspacio = 'INSERT INTO Espacio (identificador, idTipoEspacio, idEstacionamiento) VALUES (?, ?, ?);';
        return db.query(insertEspacio, [objeto.identificador, objeto.tipoEspacio, objeto.id]);
    }

    updateEspacio(objeto) {
        const updateEspacio = 'UPDATE Espacio SET idTipoEspacio = ? WHERE identificador = ?;'
        return db.query(updateEspacio, [objeto.tipoEspacio, objeto.identificador]);
    }

    deleteEspacio(key) {
        const updateEspacio = 'UPDATE Espacio SET eliminado = 1 WHERE identificador = ?';
        return db.query(updateEspacio, [key]);
    }


}

module.exports = UtilsDaoImplementation;