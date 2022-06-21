const ControladorAplicacion = require('../controller/controladorAplicacion');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerOperador = express.Router();

const db = require('../controller/dao/dbconnection');

const GestorFuncionarios = require('../controller/gestorFuncionarios');
const { type } = require('express/lib/response');


const dias = ['l', 'k', 'm', 'j', 'v', 's'];
const periodos = ['m', 't', 'n'];

const PDFDocument = require('pdfkit');
const fs = require('fs');

const Utils = require('../controller/utils');
const utils = new Utils();

//Valida que haya iniciado la sesión
routerOperador.use(function(req, res, next) {
    if (req.session.loggedin && typeof req.session.userInfo != 'undefined') {
        next();
    } else {
        const alerta = "No has iniciado sesión";
        res.render("inicioSesion.ejs", { alerta: alerta });
    }
});


routerOperador.get('/', (req, res) => {
    res.redirect('operador/estacionamiento');
});

routerOperador.get('/estacionamiento', async(req, res) => {
    const estacionamiento = await controladorAplicacion.obtenerEstacionamientoPorEncargado(req.session.userInfo.idOperador);
    res.render('estacionamientoOperador.ejs', { estacionamiento: estacionamiento[0] });
});

routerOperador.get('/reservaciones', async(req, res) => {
    const estacionamiento = await controladorAplicacion.obtenerEstacionamientoPorEncargado(req.session.userInfo.idOperador);
    const reservaciones = await controladorAplicacion.obtenerReservacionesPorEstacionamiento(estacionamiento[0].idEstacionamiento);
    res.render('reservacionesOperador.ejs', { reservaciones });

});


//export this router to use in our index.js
module.exports = routerOperador;