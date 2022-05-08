var express = require('express');
var routerAdmin = express.Router();

routerAdmin.get('/', (req, res) => {
    res.render('gestionUsuarios.ejs');
})
routerAdmin.get('/registroFuncionario', (req, res) => {
    res.render('registroFuncionario.ejs');
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

routerAdmin.get('/edicionFuncionarios', (req, res) => {
    let { id } = req.query;
    var lista = [];
    if (id) {
        res.render('edicionFuncionarios.ejs', { data: lista });
    } else {
        res.render('edicionFuncionarios.ejs', { data: lista });
    }



});

routerAdmin.get('/edicionFuncionarios/:id', (req, res) => {
    let { id } = req.params;
    console.log(id);
    console.log("HERE");
    res.send(id);
});


//export this router to use in our index.js
module.exports = routerAdmin;