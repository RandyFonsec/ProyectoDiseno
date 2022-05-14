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
        const insertFuncionario = 'INSERT INTO Funcionario (identificacion, nombre, primerApellido, segundoApellido, numeroCelular, correoInstitucional, correoAlterno, jefe, discapacidad, notificacionesAlternas, idDepartamento, idTipoFuncionario, contrasenna) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        db.query(insertFuncionario, [objeto.identificacion, objeto.nombre, objeto.apellido1, objeto.apellido2, objeto.telefono, objeto.correo, objeto.correoAlterno, objeto.esJefe, objeto.esDiscapacitado, objeto.alternas, objeto.departamento, objeto.rol, objeto.contrasenna], function(err, result) {
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
    getAllTotal() {
        const selectFuncionario = 'SELECT f.identificacion, CONCAT(f.nombre, " ", f.primerApellido, " ", f.segundoApellido) AS nombreCompleto, f.numeroCelular, f.correoInstitucional, f.correoAlterno, f.jefe, f.discapacidad, CONCAT(d.codigoDepartamento," - " , d.descripcion) AS departamento, t.tipoFuncionario FROM Funcionario AS f INNER JOIN Departamento AS d ON d.idDepartamento = f.idDepartamento INNER JOIN TipoFuncionario AS t ON t.idTipoFuncionario = f.idTipoFuncionario;';
        return db.query(selectFuncionario);
    }

    get(key) {
        const selectFuncionario = 'SELECT * FROM Funcionario WHERE identificacion = ?';
        return db.query(selectFuncionario, [key]);
    }
    getTotal(idFuncionario) {
        const selectFuncionario = 'SELECT f.identificacion, CONCAT(f.nombre, " ", f.primerApellido, " ", f.segundoApellido) AS nombreCompleto, f.numeroCelular, f.correoInstitucional, f.correoAlterno, f.jefe, f.discapacidad, CONCAT(d.codigoDepartamento," - " , d.descripcion) AS departamento, t.tipoFuncionario FROM Funcionario AS f INNER JOIN Departamento AS d ON d.idDepartamento = f.idDepartamento INNER JOIN TipoFuncionario AS t ON t.idTipoFuncionario = f.idTipoFuncionario WHERE f.identificacion = ?;';
        return db.query(selectFuncionario, [idFuncionario]);
    }

    delete(key) {
        const updateFuncionario = 'UPDATE Funcionario SET eliminado = 1 WHERE identificacion = ?';
        return db.query(updateFuncionario, [key]);
    }

    getByMail(correo, contrasenna) {
        console.log("erroneo");
        const selectFuncionario = 'SELECT * FROM Funcionario WHERE correoInstitucional = ? and contrasenna = ? and eliminado = 0;';
        return db.query(selectFuncionario, [correo, contrasenna]);
    }

    getByDepartamento(idDepartamento) {
        const selectFuncionario = 'SELECT f.identificacion, CONCAT(f.nombre, " ", f.primerApellido, " ", f.segundoApellido) AS nombreCompleto, f.numeroCelular, f.correoInstitucional, f.correoAlterno, f.jefe, f.discapacidad, CONCAT(d.codigoDepartamento," - " , d.descripcion) AS departamento, t.tipoFuncionario FROM Funcionario AS f INNER JOIN Departamento AS d ON d.idDepartamento = f.idDepartamento INNER JOIN TipoFuncionario AS t ON t.idTipoFuncionario = f.idTipoFuncionario WHERE f.idDepartamento = ?;';
        return db.query(selectFuncionario, [idDepartamento]);
    }

}

module.exports = FuncionarioDaoImplementation;