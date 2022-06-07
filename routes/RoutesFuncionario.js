const ControladorAplicacion = require('../controller/controladorAplicacion');
const Utils = require('../controller/utils');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerFuncionario = express.Router();

const db = require('../controller/dao/dbconnection');
const utils = new Utils();


const dias = ['l', 'k', 'm', 'j', 'v', 's'];
const periodos = ['m', 't', 'n'];

// -----  Valida que haya iniciado la sesión
routerFuncionario.use(function(req, res, next) {
    if (req.session.loggedin && typeof req.session.userInfo != 'undefined') {
        next();
    } else {
        res.send("No has iniciado");
    }
});



//--------------------- HOME
routerFuncionario.get('/', async(req, res) => {
    const placas = await controladorAplicacion.obtenerPlacas(req.session.userInfo.idFuncionario);
    res.redirect('funcionario/perfil');
});

routerFuncionario.get('/perfil', async(req, res) => {
    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    res.render('perfilFuncionario.ejs', { funcionario, departamento: departamento[0] });
});



// --------------------  PLACAS
routerFuncionario.post('/perfil/placas', async(req, res) => {
    const { idPlaca } = req.body;

    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    const placadb = await controladorAplicacion.validarRegistroPlaca(idPlaca);
    const placas = await controladorAplicacion.obtenerPlacas(funcionario.idFuncionario);

    if (!placadb[0]) {
        await controladorAplicacion.agregarPlaca(funcionario.idFuncionario, idPlaca);
        const alerta = "La placa ha sido registrado exitosamente";
        res.render('perfilFuncionario.ejs', { funcionario, departamento: departamento[0], data: placas, alerta: alerta });
    } else {
        const error = "Ya existe una placa con esa identificación";
        const placas = await controladorAplicacion.obtenerPlacas(funcionario.identificacion);
        res.render('perfilFuncionario.ejs', { funcionario, departamento: departamento[0], data: placas, error: error });
    }

});

routerFuncionario.get('/eliminarPlaca/:id', async(req, res) => {
    const { id } = req.params;
    const result = await controladorAplicacion.eliminarPlaca(req.session.userInfo.idFuncionario, id);
    res.redirect('/funcionario/perfil/placas');
});

routerFuncionario.get('/perfil/placas', async(req, res) => {
    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    const placas = await controladorAplicacion.obtenerPlacas(funcionario.idFuncionario);
    res.render('perfilFuncionario.ejs', { funcionario, departamento: departamento[0], data: placas });
});



// -------------------- FRANJAS
routerFuncionario.post('/franjas', (req, res) => {

    const id = req.session.userInfo.idFuncionario;
    const lista = utils.actualizarListaFranjas(req, id);

    controladorAplicacion.actualizarFranjas(lista);
    res.redirect('/funcionario/perfil');

});

routerFuncionario.get('/perfil/franjas', async(req, res) => {
    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    const franjas = await controladorAplicacion.obtenerFranjas(funcionario.idFuncionario);

    res.render('perfilFuncionario.ejs', { funcionario, departamento: departamento[0], franjas });
});





//export this router to use in our index.js
module.exports = routerFuncionario;