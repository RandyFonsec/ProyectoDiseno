const db = require('../controller/dao/dbconnection');



class Simulador {

    simular(fecha, periodo) {
        var sentencia = "";
        var array = [];
        console.log(periodo);
        switch (periodo) {
            case 'n':
                sentencia = 'UPDATE Reserva SET activa = 0 WHERE (fecha < ? OR (fecha = ? AND (horario = \'t\' OR horario = \'m\'))) AND idTipoReserva = 1';
                array = [fecha, fecha];
                break;
            case 't':
                sentencia = 'UPDATE Reserva SET activa = 0 WHERE (fecha < ? OR (fecha = ? AND horario = \'m\')) AND idTipoReserva = 1';
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