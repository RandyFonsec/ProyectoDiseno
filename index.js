const ControladorAplicacion = require('./controller/controladorAplicacion');
const controladorAplicacion = new ControladorAplicacion();

const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

const routesAdmin = require('./routes/RoutesAdmin.js');
const routesFuncionario = require('./routes/RoutesFuncionario.js');
const routesJefe = require('./routes/RoutesJefe.js');
const routesOperador = require('./routes/RoutesOperador.js');
// ´Para actualizar el sitio web: git push heroku main
// Para compilar en desarrollo: npm run dev

// Configuraciones
app.set('AppName', 'tutorial');
app.set('port', process.env.PORT || 3000);
//  Motor de plantillas
app.set('view engine', 'ejs');


// Sesión
app.set('trust proxy', 1)

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "secret"
}));

// Create application/x-www-form-urlencoded parser  
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Middlewares (Van antes de las rutas)
// Se ejecutan antes de ir a la ruta
// con app.use(function)

//Express ahora entiende json
app.use(express.json());

app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
    res.render('inicioSesion.ejs');
});

app.post('/inicio', async(req, res) => {
    var { nombreUsuario, contrasenna } = req.body;

    req.session.loggedin = false;
    req.session.userInfo = undefined;

    if (nombreUsuario == 'admin' && contrasenna == 'admin') {
        req.session.loggedin = true;
        res.redirect('/admin');
    } else {
        const result = await controladorAplicacion.validarFuncionario(nombreUsuario, contrasenna);
        if (result.length == 0) {
            const operador = await controladorAplicacion.validarOperador(nombreUsuario, contrasenna);
            if (operador.length == 0) {
                const mensaje = 'Correo o contraseña incorrectos';
                res.render('inicioSesion.ejs', { error: mensaje })
            } else {
                req.session.userInfo = operador[0];
                req.session.loggedin = true;
                res.redirect('/operador');
            }

        } else {
            req.session.userInfo = result[0];
            req.session.loggedin = true;
            if (result[0].jefe) {
                res.redirect('/jefe');
            } else {
                res.redirect('/funcionario');
            }

        }
    }
});

app.use('/admin', routesAdmin);
app.use('/funcionario', routesFuncionario);
app.use('/jefe', routesJefe);
app.use('/operador', routesOperador);


app.get('*', (req, res) => {
    res.send("404 ERROR");
});

app.listen(app.get('port'), () => {
    console.log("Servidor TEC escuchando en " + app.get('port'));
});