const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const routesAdmin = require('./routes/RoutesAdmin.js');

//git push heroku main: Actualiza el sitio web



/*
Para compilar en desarrollo: npm run dev
*/

//Settings
app.set('AppName', 'tutorial');
app.set('port', process.env.PORT || 3000);
//Motor plantillas
app.set('view engine', 'ejs');

// Create application/x-www-form-urlencoded parser  
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
    //Middleware (Van antes de las rutas)

//Se ejecutan antes de ir a la ruta
//con app.use(function)

//Express ahora entiende json
app.use(express.json());


/* Este middleware va aqui */
//Investigar
app.use(express.static('public'));

//sesion
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));




//Routes
app.get('/', (req, res) => {
    res.render('inicioSesion.ejs');
});

app.use('/admin', routesAdmin);


app.post('/inicio', (req, res) => {
    var { nombreUsuario, contrasenna } = req.body;
    req.session.loggedin = true;
    req.session.username = nombreUsuario;

    res.redirect('admin');
});
app.post('/test', (req, res) => {
    const names = ['isLunes', 'isMartes', 'isMiercoles', 'isJueves', 'isViernes', 'isSabado'];
    console.log(req.body);
    res.send('departamento ' + req.body.departamento);
    for (var i = 0; i < names.length; i++) {
        if (req.body[names[i]]) {
            console.log(names[i]);
        } else {
            console.log("no " + names[i]);
        }
    }
    const a = ['No se pudo'];
    console.log(req.body.departamento);
    res.send('ok');

});

app.get('*', (req, res) => {


    res.send("404 ERROR");
});

app.listen(app.get('port'), () => {

    console.log("Servidor TEC escuchando en " + app.get('port'));
});