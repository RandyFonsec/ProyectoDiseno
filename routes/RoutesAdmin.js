const ControladorAplicacion = require ('../controller/controladorAplicacion');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerAdmin = express.Router();

<<<<<<< HEAD
const db = require ('../controller/dao/dbconnection');
const GestorFuncionarios = require('../controller/gestorFuncionarios');
=======
const db = require('../controller/dao/dbconnection');
>>>>>>> c41056d59e6334ddab24c3e2f4c6c9d009d198d8

//Valida que haya iniciado la sesión
routerAdmin.use(function(req, res, next) {
    /*if (req.session.loggedin) {
        next();
    } else {
        res.send("No haz iniciado");
    }*/
    next();

});
//Home
routerAdmin.get('/', (req, res) => {
    res.render('gestionFuncionarios.ejs');
})

//TODO: Ver nombres xdd
//TODO: Bug navbar
//--------------------Funcionarios ??? 
routerAdmin.get('/gestionFuncionarios', (req, res) => {
    res.render('gestionFuncionarios.ejs');
})

routerAdmin.get('/registroFuncionario', async(req, res) => {
    const departments_list = await db.query('SELECT * FROM Departamento');
    res.render('registroFuncionario.ejs', { departments_list });
    console.log()


});

<<<<<<< HEAD
routerAdmin.post ('/registroFuncionario', async (req, res) => {
    const { identificacion, nombre, apellido1, apellido2, telefono, correo, correoAlterno, departamento, esJefe, esDiscapacitado, rol } = req.body;
    const funcionario = {
        identificacion, 
        nombre, 
        apellido1, 
        apellido2, 
        telefono, 
        correo, 
        correoAlterno, 
        departamento,
        esJefe, 
        esDiscapacitado,
        rol
    }
    if (!funcionario.esJefe) {
        funcionario.esJefe = 0;
    }
    if (!funcionario.esDiscapacitado) {
        funcionario.esDiscapacitado = 0;
    }
    await controladorAplicacion.agregarFuncionario (funcionario);
    res.send ('received');
=======
routerAdmin.post('/registroFuncionario', async(req, res) => {
    const { identificacion, nombre, apellido1, apellido2, telefono, correo, correoAlterno, esJefe, rol } = req.body;
    const funcionario = {
        identificacion,
        nombre,
        apellido1,
        apellido2,
        telefono,
        correo,
        correoAlterno,
        esJefe,
        rol
    }
    console.log(funcionario);
    //console.log (req.body);
    //console.log (req.body);
    //console.log (req.body.esDiscapacitado);
    res.send('received');
>>>>>>> c41056d59e6334ddab24c3e2f4c6c9d009d198d8
});

routerAdmin.get('/edicionFuncionarios', (req, res) => {
    let { id } = req.query;
    let lista = [{}];
    let lista2 = [{}];
    if (id) {
        res.render('edicionFuncionarios.ejs', { data: lista });
    } else {
        res.render('edicionFuncionarios.ejs', { data: lista2 });
    }

});

routerAdmin.get('/eliminadoFuncionario/:id', (req, res) => {
    let { id } = req.params;
    let data = [{ nombre: 'Juan' }];
    res.render('edicionFuncionario.ejs', data);
});

//--------------------Estacionamientos
routerAdmin.get('/gestionEstacionamientos', (req, res) => {
    res.render('gestionEstacionamientos.ejs');
});

routerAdmin.get('/edicionEstacionamientos', (req, res) => {
    let lista = [{ identificacion: 12, nombre: '1' }, { identificacion: 123, nombre: '121' }, { identificacion: 22212, nombre: '121311' }]
    res.render('edicionEstacionamientos.ejs', { data: lista });
});

routerAdmin.get('/registroEstacionamiento', (req, res) => {
    res.render('registroEstacionamiento.ejs');
});

routerAdmin.get('/edicionFuncionarios/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    console.log("HERE");
    res.send(id);
});

//--------------------Espacios
routerAdmin.get('/edicionEspacios/:id', (req, res) => {
    let lista = [{ identificacion: 12 }, { identificacion: 123 }, { identificacion: 22212 }]
    res.render('edicionEspacios.ejs', { data: lista });
});

routerAdmin.get('/edicionEspacios/:id', (req, res) => {
    let lista = [{ identificacion: 12 }, { identificacion: 123 }, { identificacion: 22212 }]
    res.render('edicionEspacios.ejs', { data: lista });
});

routerAdmin.get('/registroEspacio', (req, res) => {
    res.render('registroEspacio.ejs');
});

//--------------------Placas

routerAdmin.get('/gestionPlacas', (req, res) => {
    res.render('gestionPlacas.ejs');
});

//export this router to use in our index.js
module.exports = routerAdmin;