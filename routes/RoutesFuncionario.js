const ControladorAplicacion = require('../controller/controladorAplicacion');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerFuncionario = express.Router();

const db = require('../controller/dao/dbconnection');

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


//export this router to use in our index.js
module.exports = routerFuncionario;