const ControladorAplicacion = require('../controller/controladorAplicacion');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerJefe = express.Router();

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
routerJefe.use(function(req, res, next) {
    if (req.session.loggedin && typeof req.session.userInfo != 'undefined' && req.session.userInfo.jefe) {
        next();
    } else {
        const alerta = "No has iniciado sesión";
        res.render("inicioSesion.ejs", { alerta: alerta });
    }
});


routerJefe.get('/', (req, res) => {
    res.redirect('jefe/perfil');
});


routerJefe.get('/perfil', async(req, res) => {
    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    res.render('perfilJefe.ejs', { funcionario, departamento: departamento[0] });
});

// --------------------  PLACAS
routerJefe.post('/perfil/placas', async(req, res) => {
    const { idPlaca } = req.body;

    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    const placadb = await controladorAplicacion.validarRegistroPlaca(idPlaca);
    const placas = await controladorAplicacion.obtenerPlacas(funcionario.idFuncionario);

    if (!placadb[0]) {
        await controladorAplicacion.agregarPlaca(funcionario.idFuncionario, idPlaca);
        const alerta = "La placa ha sido registrado exitosamente";
        res.render('perfilJefe.ejs', { funcionario, departamento: departamento[0], data: placas, alerta: alerta });
    } else {
        const error = "Ya existe una placa con esa identificación";
        const placas = await controladorAplicacion.obtenerPlacas(funcionario.identificacion);
        res.render('perfilJefe.ejs', { funcionario, departamento: departamento[0], data: placas, error: error });
    }

});

routerJefe.get('/eliminarPlaca/:id', async(req, res) => {
    const { id } = req.params;
    const result = await controladorAplicacion.eliminarPlaca(req.session.userInfo.idFuncionario, id);
    res.redirect('/jefe/perfil/placas');
});

routerJefe.get('/perfil/placas', async(req, res) => {
    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    const placas = await controladorAplicacion.obtenerPlacas(funcionario.idFuncionario);
    res.render('perfilJefe.ejs', { funcionario, departamento: departamento[0], data: placas });
});



// -------------------- FRANJAS
routerJefe.post('/franjas', (req, res) => {

    const id = req.session.userInfo.idFuncionario;
    const lista = utils.actualizarListaFranjas(req, id);
    controladorAplicacion.actualizarFranjas(lista);
    res.redirect('/jefe/perfil');

});

routerJefe.get('/perfil/franjas', async(req, res) => {
    const funcionario = req.session.userInfo;
    const departamento = await controladorAplicacion.obtenerDepartamento(funcionario.idDepartamento);
    const franjas = await controladorAplicacion.obtenerFranjas(funcionario.idFuncionario);

    res.render('perfilJefe.ejs', { funcionario, departamento: departamento[0], franjas });
});


// -------------------- RESERVACIONES

routerJefe.get('/reservaciones', async(req, res) => {
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    res.render('reservacionJefe.ejs', { estacionamientos });
})


routerJefe.get('/reservas/:identificador', async(req, res) => {
    const { identificador } = req.params;
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    const estacionamiento = await controladorAplicacion.obtenerEstacionamiento(identificador);
    res.render('reservacionJefe.ejs', { estacionamientos, data: estacionamiento[0] });
})

routerJefe.get('/reservas/:identificador/espacios', async(req, res) => {
    const { identificador } = req.params;
    const date = new Date(req.query.fecha);
    const dia = utils.intToDay(date.getDay());
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    var data = await controladorAplicacion.obtenerEstacionamiento(identificador);
    data = data[0];
    const { tipoReserva } = req.query;

    if (tipoReserva == 2) {
        //Visita
        const espacios = await controladorAplicacion.obtenerEspaciosVisitas(data.idEstacionamiento);
        const infoReserva = {
            fecha: req.query.fecha,
            visita: true
        }
        if (espacios.length == 0) {
            res.render('reservacionJefe.ejs', { estacionamientos, data, mensaje: "No hay espacios disponibles" });
        } else {
            res.render('reservacionJefe.ejs', { estacionamientos, data, espacios, infoReserva });
        }
    } else {
        //Jefe
        const result = await controladorAplicacion.validarHorario(req.session.userInfo.idFuncionario, dia, 'm', 1);
        if (result.length != 0) {
            const tipoEspacio = req.session.userInfo.discapacidad == 1 ? 5 : 2;
            const espacios = await controladorAplicacion.obtenerEspaciosPorTipo(req.query.fecha, "", data.idEstacionamiento, tipoEspacio);
            const infoReserva = {
                fecha: req.query.fecha,
                dia: dia
            }
            if (espacios.length == 0) {
                res.render('reservacionJefe.ejs', { estacionamientos, data, mensaje: "No hay espacios disponibles" });
            } else {
                res.render('reservacionJefe.ejs', { estacionamientos, data, espacios, infoReserva });
            }

        } else {
            res.render('reservacionJefe.ejs', { estacionamientos, data, mensaje: "No puede reservar fuera de su horario" });

        }
    }
});


routerJefe.post('/reservar/jefe', async(req, res) => {
    const { idEspacio, fecha, dia, horario } = req.body;
    const espacio = await controladorAplicacion.obtenerEspacioReservado(idEspacio, fecha, dia, horario);
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    const alerta = "El espacio fue reservado"
    if (espacio.length == 0) {
        //No existe se crea
        await controladorAplicacion.crearReservacion(req.session.userInfo.identificacion, idEspacio, fecha, dia, 'm', 2);
    } else {
        //Existe se actualiza
        await controladorAplicacion.actualizarReservacion(req.session.userInfo.identificacion, idEspacio, fecha, dia, 'm', 2);

    }

    res.render('reservacionJefe.ejs', { estacionamientos, alerta });


});

routerJefe.post('/reservar/visita', async(req, res) => {
    const { idEspacio, fecha, nombre, id, vehiculo, motivo, sitio } = req.body;
    const date = new Date(fecha);
    const dia = utils.intToDay(date.getDay());
    const objeto = {
        idEspacio,
        fecha,
        nombre,
        id,
        vehiculo,
        motivo,
        sitio,
        jefe: req.session.userInfo.identificacion,
        dia,
        horario: "m"
    }
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    const alerta = "El espacio fue reservado"

    await controladorAplicacion.reservarEspacio(idEspacio);
    await controladorAplicacion.registrarVisita(objeto);

    res.render('reservacionJefe.ejs', { estacionamientos, alerta })
});

//export this router to use in our index.js
module.exports = routerJefe;