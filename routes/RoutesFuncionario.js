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
    if (req.session.loggedin && typeof req.session.userInfo != 'undefined' && req.session.userInfo.jefe == 0) {
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


// -------------------- RESERVAS
routerFuncionario.get('/reservas', async(req, res) => {
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    res.render('reservacionFuncionario.ejs', { estacionamientos });
});

routerFuncionario.get('/reservas/:identificador', async(req, res) => {
    const { identificador } = req.params;
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    const estacionamiento = await controladorAplicacion.obtenerEstacionamiento(identificador);
    res.render('reservacionFuncionario.ejs', { estacionamientos, data: estacionamiento[0] });
});

routerFuncionario.get('/reservas/:identificador/espacios', async(req, res) => {
    const { horario } = req.query;
    const { identificador } = req.params;
    const date = new Date(req.query.fecha);
    const dia = utils.intToDay(date.getDay());
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    var data = await controladorAplicacion.obtenerEstacionamiento(identificador);
    data = data[0];
    const result = await controladorAplicacion.validarHorario(req.session.userInfo.idFuncionario, dia, horario, 2);
    if (result.length != 0) {
        const tipoEspacio = req.session.userInfo.discapacidad == 1 ? 5 : 1;
        const espacios = await controladorAplicacion.obtenerEspaciosPorTipo(req.query.fecha, req.query.horario, data.idEstacionamiento, tipoEspacio);
        const infoReserva = {
            fecha: req.query.fecha,
            dia: dia,
            horario: req.query.horario
        }
        if (espacios.length == 0) {
            res.render('reservacionFuncionario.ejs', { estacionamientos, data, mensaje: "No hay espacios disponibles" });
        } else {
            res.render('reservacionFuncionario.ejs', { estacionamientos, data, espacios, infoReserva });
        }

    } else {
        res.render('reservacionFuncionario.ejs', { estacionamientos, data, mensaje: "No puede reservar fuera de su horario" });

    }
});


routerFuncionario.post('/reservar', async(req, res) => {
    const { idEspacio, fecha, dia, horario } = req.body;
    const espacio = await controladorAplicacion.obtenerEspacioReservado(idEspacio, fecha, dia, horario);
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    const alerta = "El espacio fue reservado"
    if (espacio.length == 0) {
        //No existe se crea
        await controladorAplicacion.crearReservacion(req.session.userInfo.identificacion, idEspacio, fecha, dia, horario, 1);
    } else {
        //Existe se actualiza
        await controladorAplicacion.actualizarReservacion(req.session.userInfo.identificacion, idEspacio, fecha, dia, horario, 1);

    }

    res.render('reservacionFuncionario.ejs', { estacionamientos, alerta });


});


routerFuncionario.post('/reservaciones', async(req, res) => {
    const { desde, hasta } = req.body;
    const reservaciones = await controladorAplicacion.obtenerReservacionesEnRango(req.session.userInfo.identificacion, desde, hasta);
    const estacionamientos = await controladorAplicacion.obtenerEstacionamientos();
    res.render('reservacionFuncionario.ejs', { estacionamientos, reservaciones });
});




//export this router to use in our index.js
module.exports = routerFuncionario;