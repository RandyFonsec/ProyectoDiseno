const ControladorAplicacion = require('../controller/controladorAplicacion');

const controladorAplicacion = new ControladorAplicacion();

var express = require('express');

var routerFuncionario = express.Router();

const db = require('../controller/dao/dbconnection');

//Valida que haya iniciado la sesión
routerFuncionario.use(function(req, res, next) {
    /*if (req.session.loggedin and typeof req.session.userInfo != 'undefined') {
        next();
    } else {
        res.send("No haz iniciado");
    }*/
    next();
});


//Home
routerFuncionario.get('/', async(req, res) => {
    const placas = await controladorAplicacion.obtenerPlacas(session.userInfo.identificacion);
    res.render('gestionPlacas.ejs', { data: placas });
})

routerFuncionario.post('/gestionPlacas', async(req, res) => {
    console.log(session.userInfo);

})




//export this router to use in our index.js
module.exports = routerFuncionario;