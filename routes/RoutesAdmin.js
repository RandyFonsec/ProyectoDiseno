var express = require('express');
var routerAdmin = express.Router();

routerAdmin.get('/', (req, res) => {
    res.render('gestionUsuarios.ejs');
})
routerAdmin.get('/registroUsuario', (req, res) => {
    res.render('registroUsuario.ejs');
})
routerAdmin.get('/gestionUsuarios', (req, res) => {
    res.render('gestionUsuarios.ejs');
})
routerAdmin.get('/gestionEstacionamientos', (req, res) => {
    res.send('Estacionamientos');
})
routerAdmin.get('/gestionPlacas', (req, res) => {
    res.send('Placas');
})


//export this router to use in our index.js
module.exports = routerAdmin;