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
        const insertFuncionario = 'INSERT INTO Funcionario (identificacion, nombre, primerApellido, segundoApellido, numeroCelular, correoInstitucional, correoAlterno, jefe, discapacidad, idDepartamento, idTipoFuncionario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';
        db.query(insertFuncionario, [objeto.identificacion, objeto.nombre, objeto.apellido1, objeto.apellido2, objeto.telefono, objeto.correo, objeto.correoAlterno, objeto.esJefe, objeto.esDiscapacitado, objeto.departamento, (objeto.rol + 1)], function(err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("Employee Id:- " + result.insertId);
            }
        });
    }

}

module.exports = FuncionarioDaoImplementation;