const db = require('../controller/dao/dbconnection');



class Simulador {

    simular(fecha, periodo) {
        var sentencia = "";
        var array = [];
        switch (periodo) {
            case 'n':
                sentencia = 'UPDATE Reserva SET activa = 0 WHERE (fecha < ? OR (fecha = ? AND horario in(\'t\',\'m\'))) AND idTipoReserva = 1';
                array = [fecha, fecha];
                break;
            case 't':

                sentencia = 'UPDATE Reserva SET activa = 0 WHERE (fecha < ? OR (fecha = ? AND horario in(\'m\'))) AND idTipoReserva = 1';
                array = [fecha, fecha];
                break;
            default:
                sentencia = 'UPDATE Reserva SET activa = 0 WHERE fecha < ? AND idTipoReserva = 1';
                array = [fecha];
                break;
        }


        //"UPDATE"

        //Estandar
        db.query(sentencia, array);


        //Jefe
        const consulta = 'UPDATE Reserva SET activa = 0 WHERE fecha < ? AND idTipoReserva = 2';
        db.query(consulta, [fecha]);
    }
}

module.exports = Simulador;