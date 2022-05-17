const ControladorAplicacion = require('../controller/controladorAplicacion');
const utils = require('../controller/utils');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerFuncionario = express.Router();

const db = require('../controller/dao/dbconnection');
const Utils = require('../controller/utils');


const dias = ['l', 'k', 'm', 'j', 'v', 's'];
const periodos = ['m', 't', 'n'];

//Valida que haya iniciado la sesión
routerFuncionario.use(function(req, res, next) {
    if (req.session.loggedin && typeof req.session.userInfo != 'undefined') {
        next();
    } else {
        res.send("No haz iniciado");
    }
});

//Home
routerFuncionario.get('/', async(req, res) => {
    const placas = await controladorAplicacion.obtenerPlacas(req.session.userInfo.identificacion);
    res.render('gestionPlacas.ejs', { data: placas });
});

routerFuncionario.post('/gestionPlacas', async(req, res) => {
    const { idPlaca } = req.body;
    const result = controladorAplicacion.agregarPlaca(req.session.userInfo.idFuncionario, idPlaca);
    res.redirect('/funcionario');

});

routerFuncionario.get('/eliminarPlaca/:id', async(req, res) => {
    const { id } = req.params;
    const result = await controladorAplicacion.eliminarPlaca(req.session.userInfo.idFuncionario, id);
    res.redirect('/funcionario');
});


routerFuncionario.get('/franjas', async(req, res) => {
    const id = req.session.userInfo.idFuncionario;
    const franjas = await controladorAplicacion.obtenerFranjas(id);
    res.render('gestionFranjas.ejs', { franjas });
});

routerFuncionario.post('/franjas', (req, res) => {

    const id = req.session.userInfo.idFuncionario;
    const lista = [];
    let lista2 = [];


    for (var i = 0; i < dias.length; i++) {
        if (req.body[dias[i]]) {
            for (var j = 0; j < periodos.length; j++) {
                if (req.body[dias[i] + periodos[j]]) {
                    lista2 = [1, dias[i], periodos[j], id];
                } else {
                    lista2 = [0, dias[i], periodos[j], id];
                }
                lista.push(lista2);
                lista2 = [];
            }
        } else {
            for (var j = 0; j < periodos.length; j++) {
                lista2 = [0, dias[i], periodos[j], id];
                lista.push(lista2);
                lista2 = [];
            }
        }
    }

    controladorAplicacion.actualizarFranjas(lista);
    res.redirect('/funcionario/franjas');

});



//export this router to use in our index.js
module.exports = routerFuncionario;