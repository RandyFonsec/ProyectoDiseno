//const db = require ('./controller/dao/dbconnection');
const db = require('./dbconnection');
const DAO = require('./dao');

class FuncionarioDaoImplementation extends DAO {

    static instanciaSingletonDaoFuncionario;

    constructor() {
        if (!FuncionarioDaoImplementation.instanciaSingletonDaoFuncionario) {
            super();
            FuncionarioDaoImplementation.instanciaSingletonDaoFuncionario = this;
        }
        return FuncionarioDaoImplementation.instanciaSingletonDaoFuncionario;
    }

    create(objeto) {
        const insertFuncionario = 'INSERT INTO Funcionario (identificacion, nombre, primerApellido, segundoApellido, numeroCelular, correoInstitucional, correoAlterno, jefe, discapacidad, notificacionesAlternas, idDepartamento, idTipoFuncionario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        db.query(insertFuncionario, [objeto.identificacion, objeto.nombre, objeto.apellido1, objeto.apellido2, objeto.telefono, objeto.correo, objeto.correoAlterno, objeto.esJefe, objeto.esDiscapacitado, objeto.alternas, objeto.departamento, objeto.rol], function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Employee Id:- " + result.insertId);
            }
        });
    }


    update(objeto) {
        const updateFuncionario = 'UPDATE Funcionario SET identificacion = ?, nombre = ?, primerApellido = ?, segundoApellido = ?, numeroCelular = ?, correoInstitucional = ? , correoAlterno = ?, jefe = ?, discapacidad = ?, notificacionesAlternas = ?, idDepartamento = ?, idTipoFuncionario = ? WHERE identificacion = ?';
        return db.query(updateFuncionario, [objeto.identificacion, objeto.nombre, objeto.apellido1, objeto.apellido2, objeto.telefono, objeto.correo, objeto.correoAlterno, objeto.esJefe, objeto.esDiscapacitado, objeto.alternas, objeto.departamento, objeto.rol, objeto.identificacion]);
    }

    getAll() {
        const selectFuncionario = 'SELECT * FROM Funcionario WHERE eliminado = 0';
        return db.query(selectFuncionario);
    }

    get(key) {
        const selectFuncionario = 'SELECT * FROM Funcionario WHERE identificacion = ?;';
        return db.query(selectFuncionario, [key]);
    }


    delete(key) {
        const updateFuncionario = 'UPDATE Funcionario SET eliminado = 1 WHERE identificacion = ?';
        return db.query(updateFuncionario, [key]);
    }
}

module.exports = FuncionarioDaoImplementation;