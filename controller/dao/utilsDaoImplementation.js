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

    /* getEstacionamientosConTipo () {
        const selectEstacionamientosTipo = 'SELECT identificador as \'Identificador\', ubicacion as \'Ubicación\', horaApertura as \'Hora de apertura\', horaCierre as \'Hora de cierre\', tipoEstacionamiento as \'Tipo de estacionamiento\' FROM Estacionamiento INNER JOIN TipoEstacionamiento ON Estacionamiento.idTipoEstacionamiento = TipoEstacionamiento.idTipoEstacionamiento WHERE eliminado = 0;';
        return db.query (selectEstacionamientosTipo) ;
    } */

    getPlacas(identificacion) {
        return db.query('SELECT * FROM Placa WHERE idFuncionario = ? AND eliminada = 0', [identificacion]);
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
    getEspacios(id) {
        const getEspacio = 'SELECT * FROM Espacio WHERE eliminado = 0 and idEstacionamiento = ?;';
        return db.query(getEspacio, [id]);
    }
    getEspaciosPorTipo(fecha, horario, idEstacionamiento, tipoEspacio) {
        var getEspacios = "";
        var array = [];
        if (horario == "") {
            getEspacios = 'SELECT * FROM Espacio WHERE idEspacio NOT IN (SELECT idEspacio FROM Reserva WHERE fecha = ? AND horario = \'m\'  AND activa = 1 ) AND idEstacionamiento = ? AND idTipoEspacio = ? AND eliminado = 0;';
            array = [fecha, idEstacionamiento, tipoEspacio];
        } else {
            getEspacios = 'SELECT * FROM Espacio WHERE idEspacio NOT IN (SELECT idEspacio FROM Reserva WHERE fecha = ? AND horario = ?  AND activa = 1 ) AND idEstacionamiento = ? AND idTipoEspacio = ? AND eliminado = 0;';
            array = [fecha, horario, idEstacionamiento, tipoEspacio];

        }
        return db.query(getEspacios, array);
    }

    createEspacio(objeto) {
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

    validarRegistroPlaca(placa) {
        const selectPlaca = 'SELECT * FROM Placa WHERE placa = ? AND eliminada = 0;';
        return db.query(selectPlaca, [placa]);
    }

    validarHorario(id, dia, horario, tipoUsuario) {
        var selectFranja = "";
        var array = [];
        if (tipoUsuario == 1) {
            selectFranja = 'SELECT * FROM FranjaHoraria WHERE dia = ? AND idFuncionario = ? AND activo = 1';
            array = [dia, id];
        } else {
            selectFranja = 'SELECT * FROM FranjaHoraria WHERE dia = ? AND horario = ? AND idFuncionario = ? AND activo = 1';
            array = [dia, horario, id];
        }

        return db.query(selectFranja, array);
    }

    obtenerEspacioReservado(idEspacio, fecha, dia, horario) {
        const select = 'SELECT idEspacio FROM Reserva WHERE idEspacio =  ?  AND fecha = ? AND dia = ? AND horario = ?';
        return db.query(select, [idEspacio, fecha, dia, horario]);
    }

    crearReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva) {
        const insert = 'INSERT INTO Reserva(identificacion, idEspacio, fecha, dia, horario, activa, idTipoReserva) VALUES (?,?,?,?,?,1,?);'
        return db.query(insert, [identificacion, idEspacio, fecha, dia, horario, tipoReserva]);

    }

    actualizarReservacion(identificacion, idEspacio, fecha, dia, horario, tipoReserva) {
        const update = 'UPDATE Reserva SET identificacion = ?, idTipoReserva = ? activa = 1 WHERE idEspacio = ? AND  fecha = ? AND dia = ? AND horario = ?;';
        return db.query(update, [identificacion, tipoReserva, idEspacio, fecha, dia, horario, tipoReserva])
    }
    obtenerReservacionesEnRango(identificacion, desde, hasta) {
        const select = 'SELECT r.dia, r.horario, DATE_FORMAT(r.fecha,\'%d/%m/%Y\') AS fecha, e.identificador FROM Reserva AS r INNER JOIN Espacio AS e ON e.idEspacio = r.idEspacio WHERE r.identificacion = ? AND r.fecha BETWEEN ? AND ? ORDER BY r.fecha ASC';
        return db.query(select, [identificacion, desde, hasta]);
    }

    obtenerEspaciosVisitas(idEstacionamiento) {
        const select = 'SELECT * FROM Espacio WHERE idEstacionamiento = ? AND reservado = 0 AND idTipoEspacio = 4';
        return db.query(select, [idEstacionamiento]);
    }
    reservarEspacio(idEspacio) {
        const update = 'UPDATE Espacio SET reservado = 1 WHERE idEspacio = ?';
        db.query(update, [idEspacio]);

    }
    registrarVisita(objeto) {
        const insert = 'INSERT INTO Reserva(identificacion,dia, idEspacio, fecha, nombreVisitante, identificacionVisitante, numeroVehiculo, motivoVisita, sitioVisita, activa, idTipoReserva, horario) VALUES (?,?,?,?,?,?,?,?,?,1,3, \'m\');'
        return db.query(insert, [objeto.jefe, objeto.dia, objeto.idEspacio, objeto.fecha, objeto.nombre, objeto.id, objeto.vehiculo, objeto.motivo, objeto.sitio]);

    }

    obtenerReservacionesPorEstacionamiento(idEstacionamiento) {
        const select = 'SELECT * FROM Reserva AS r INNER JOIN Espacio AS e ON e.idEspacio = r.idEspacio INNER JOIN TipoReserva AS tr ON tr.idTipoReserva = r.idTipoReserva WHERE r.activa = 1 AND r.idEspacio in (SELECT idEspacio FROM Espacio WHERE idEstacionamiento = ? AND reservado = 1);';
        return db.query(select, [idEstacionamiento]);
    }
}

module.exports = UtilsDaoImplementation;