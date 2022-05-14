const ControladorAplicacion = require('../controller/controladorAplicacion');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerAdmin = express.Router();

const db = require('../controller/dao/dbconnection');

const GestorFuncionarios = require('../controller/gestorFuncionarios');


const dias = ['l', 'k', 'm', 'j', 'v', 's'];
const periodos = ['m', 't', 'n'];

//Valida que haya iniciado la sesión
routerAdmin.use(function(req, res, next) {
    if (req.session.loggedin && typeof req.session.userInfo == 'undefined') {
        next();
    } else {
        res.send("No haz iniciado");
    }
});

//Home
routerAdmin.get('/', (req, res) => {
    res.render('gestionFuncionarios.ejs');
})

//TODO: Ver nombres xdd
//TODO: Bug navbar

// ----- Funcionarios -----
routerAdmin.get('/gestionFuncionarios', (req, res) => {
    res.render('gestionFuncionarios.ejs');
})

routerAdmin.get('/registroFuncionario', async(req, res) => {
    const departments_list = await controladorAplicacion.obtenerDepartamentos();
    res.render('registroFuncionario.ejs', { departments_list });
});

routerAdmin.post('/registroFuncionario', async(req, res) => {
    const {
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
        alternas,
        rol,
        contrasenna
    } = req.body;
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
        alternas,
        rol,
        contrasenna
    }
    if (!funcionario.esJefe) {
        funcionario.esJefe = 0;
    }
    if (!funcionario.esDiscapacitado) {
        funcionario.esDiscapacitado = 0;
    }
    if (!funcionario.alternas) {
        funcionario.alternas = 0;
    }
    await controladorAplicacion.agregarFuncionario(funcionario);
    // res.render ('gestionFuncionarios.ejs');
    res.redirect('/admin/gestionFuncionarios');
});

routerAdmin.get('/edicionFuncionarios', async(req, res) => {
    const { id } = req.query;
    if (id) {
        let lista = await controladorAplicacion.obtenerFuncionario(id);
        res.render('edicionFuncionarios.ejs', { data: lista });
    } else {
        let lista = await controladorAplicacion.obtenerFuncionarios();
        res.render('edicionFuncionarios.ejs', { data: lista });
    }
});

routerAdmin.get('/edicionFuncionario/:id', async(req, res) => {
    let { id } = req.params;
    console.log("id" + id);
    let funcionario = await controladorAplicacion.obtenerFuncionario(id);
    console.log(funcionario);
    const departments_list = await controladorAplicacion.obtenerDepartamentos();
    res.render('edicionFuncionario.ejs', { funcionario: funcionario[0], departments_list });
});

routerAdmin.post('/actualizarFuncionario/:id', async(req, res) => {
    const {
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
        alternas,
        rol
    } = req.body;
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
        alternas,
        rol,
    }
    if (!funcionario.esJefe) {
        funcionario.esJefe = 0;
    }
    if (!funcionario.esDiscapacitado) {
        funcionario.esDiscapacitado = 0;
    }
    if (!funcionario.alternas) {
        funcionario.alternas = 0;
    }
    await controladorAplicacion.modificarFuncionario(funcionario);
    res.redirect('/admin/gestionFuncionarios');
});

routerAdmin.get('/eliminarFuncionario/:id', async(req, res) => {
    let { id } = req.params;
    await controladorAplicacion.eliminarFuncionario(id);
    res.redirect('/admin/gestionFuncionarios');
});

// Estacionamientos
routerAdmin.get('/gestionEstacionamientos', (req, res) => {
    res.render('gestionEstacionamientos.ejs');
});


routerAdmin.get('/registroEstacionamiento', async(req, res) => {
    const tiposEstacionamiento = await controladorAplicacion.obtenerTiposEstacionamiento();
    res.render('registroEstacionamiento.ejs', { tiposEstacionamiento });
});

routerAdmin.post('/registroEstacionamiento', async(req, res) => {
    const { identificador, ubicacion, horarioApertura, horarioCierre, tipoEstacionamiento } = req.body;
    const estacionamiento = {
        identificador,
        ubicacion,
        horarioApertura,
        horarioCierre,
        tipoEstacionamiento,
    }
    await controladorAplicacion.agregarEstacionamiento(estacionamiento);
    res.redirect('/admin/gestionEstacionamientos');
});

routerAdmin.get('/edicionEstacionamientos', async(req, res) => {
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    res.render('edicionEstacionamientos.ejs', { estacionamientos });
});

routerAdmin.get('/edicionEstacionamiento/:id', async(req, res) => {
    let { id } = req.params;
    let estacionamiento = await controladorAplicacion.obtenerEstacionamiento(id);
    const tiposEstacionamiento = await controladorAplicacion.obtenerTiposEstacionamiento();
    res.render('edicionEstacionamiento.ejs', { estacionamiento: estacionamiento[0], tiposEstacionamiento });
});

routerAdmin.post('/actualizarEstacionamiento/:id', async(req, res) => {
    const { identificador, ubicacion, horarioApertura, horarioCierre, tipoEstacionamiento } = req.body;
    const estacionamiento = {
        identificador,
        ubicacion,
        horarioApertura,
        horarioCierre,
        tipoEstacionamiento,
    }
    await controladorAplicacion.modificarEstacionamiento(estacionamiento);
    res.redirect('/admin/gestionEstacionamientos');
});

routerAdmin.get('/eliminarEstacionamiento/:id', async(req, res) => {
    let { id } = req.params;
    await controladorAplicacion.eliminarEstacionamiento(id);
    res.redirect('/admin/gestionEstacionamientos');
});

//--------------------Espacios

routerAdmin.get('/gestionEspacios/:id', async(req, res) => {
    const { id } = req.params;
    const tiposEspacio = await controladorAplicacion.obtenerTiposEspacio();
    const espacios = await controladorAplicacion.obtenerEspacios(id);
    res.render('gestionEspacios.ejs', { espacios, tiposEspacio, idEstacionamiento: id })
})

routerAdmin.post('/registroEspacio/:id', async(req, res) => {
    const { identificador, tipoEspacio } = req.body;
    const { id } = req.params;
    const espacio = {
        identificador,
        tipoEspacio,
        id
    }
    await controladorAplicacion.agregarEspacio(espacio);
    res.redirect('/admin/edicionEstacionamientos');
});

routerAdmin.get('/gestionEspacios/edicionEspacio/:id', async(req, res) => {
    let { id } = req.params;
    const espacio = await controladorAplicacion.obtenerEspacio(id);
    const tiposEspacio = await controladorAplicacion.obtenerTiposEspacio();
    res.render('edicionEspacio.ejs', { espacio: espacio[0], tiposEspacio })
});

routerAdmin.post('/gestionEspacios/actualizarEspacio/:id', async(req, res) => {
    const { identificador, tipoEspacio } = req.body;
    const espacio = {
        identificador,
        tipoEspacio
    }
    await controladorAplicacion.modificarEspacio(espacio);
    res.redirect('/admin/edicionEstacionamientos');
});

routerAdmin.get('/gestionEspacios/eliminarEspacio/:id', async(req, res) => {
    let { id } = req.params;
    await controladorAplicacion.eliminarEspacio(id);
    res.redirect('/admin/edicionEstacionamientos');
});

//--------------------Placas

routerAdmin.get('/gestionPlacas', (req, res) => {
    res.render('gestionPlacas.ejs');
});


// Informes

routerAdmin.get('/reportes', (req, res) => {
    res.render("reportes.ejs");
});

routerAdmin.get('/reporteGrafica', async(req, res) => {
    let manana = await controladorAplicacion.getCantidadxFranja('m');
    let tarde = await controladorAplicacion.getCantidadxFranja('t');
    let noche = await controladorAplicacion.getCantidadxFranja('n');
    let listaManana = [0, 0, 0, 0, 0, 0];
    let listaTarde = [0, 0, 0, 0, 0, 0];
    let listaNoche = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < manana.length; i++) {
        var index = dias.indexOf(manana[i].dia);
        listaManana[index] = manana[i].cantidad;
    }
    for (var i = 0; i < tarde.length; i++) {
        var index = dias.indexOf(tarde[i].dia);
        listaTarde[index] = tarde[i].cantidad;
    }
    for (var i = 0; i < noche.length; i++) {
        var index = dias.indexOf(noche[i].dia);
        listaNoche[index] = noche[i].cantidad;
    }
    res.render("grafica.ejs", { listaManana, listaTarde, listaNoche })
});


routerAdmin.get('/reporteEstacionamientos', async(req, res) => {
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientosConTipo();
    res.render('detalleEstacionamientos.ejs', { estacionamientos });
});

routerAdmin.get('/reporteFuncionarios', async(req, res) => {
    const funcionarios = await controladorAplicacion.obtenerFuncionariosTotal();

    const departamentos = await controladorAplicacion.obtenerDepartamentos();
    res.render('detalleFuncionarios.ejs', { funcionarios, departamentos });
});

routerAdmin.get('/reporteFuncionarios/:departamento', async(req, res) => {

    const { departamento } = req.params;
    const funcionarios = await controladorAplicacion.obtenerFuncionariosxDepartamento(departamento);
    const departamentos = await controladorAplicacion.obtenerDepartamentos();
    res.render('detalleFuncionarios.ejs', { funcionarios, departamentos });

});


routerAdmin.get('/reporteFuncionario', async(req, res) => {
    const { identificacion } = req.query;
    const funcionario = await controladorAplicacion.obtenerFuncionarioTotal(identificacion);
    console.log(funcionario[0]);
    res.render("detalleFuncionario.ejs", { funcionario: funcionario[0] });


})




//export this router to use in our index.js
module.exports = routerAdmin;