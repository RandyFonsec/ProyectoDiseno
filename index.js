const ControladorAplicacion = require('./controller/controladorAplicacion');
const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const routesAdmin = require('./routes/RoutesAdmin.js');
const routesFuncionario = require('./routes/RoutesFuncionario.js');

const controladorAplicacion = new ControladorAplicacion();
const GestorFuncionarios = require('./controller/gestorFuncionarios');


//git push heroku main: Actualiza el sitio web
//Para compilar en desarrollo: npm run dev



//Settings
app.set('AppName', 'tutorial');
app.set('port', process.env.PORT || 3000);
//Motor plantillas
app.set('view engine', 'ejs');


//sesion
app.set('trust proxy', 1) // trust first proxy
app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))
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






//Routes
app.get('/', (req, res) => {

    res.render('inicioSesion.ejs');
});

app.use('/admin', routesAdmin);

app.use('/funcionario', routesFuncionario);

app.post('/inicio', async(req, res) => {
    var { nombreUsuario, contrasenna } = req.body;

    if (nombreUsuario == 'admin' && contrasenna == 'admin') {
        session.loggedin = true;
        res.redirect('/admin');
    } else {
        const result = await controladorAplicacion.validarFuncionario(nombreUsuario, contrasenna);
        if (result.length == 0) {
            const mensaje = 'Correo o contraseña incorrectos';
            res.render('inicioSesion.ejs', { error: mensaje })
        } else {
            session.userInfo = result;
            session.loggedin = true;
            res.redirect('/funcionario');
        }
    }




});


app.get('*', (req, res) => {
    res.send("404 ERROR");
});

app.listen(app.get('port'), () => {

    console.log("Servidor TEC escuchando en " + app.get('port'));
});