const express = require('express')
const app = express();
const bodyParser = require('body-parser');

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




//Routes
app.get('/', (req, res) => {
    console.log("Hola");
    res.render('inicioSesion.ejs');
});

app.get('*', (req, res) => {
    res.send("404 ERROR");
});

app.listen(app.get('port'), () => {
    console.log("Servidor TEC escuchando en " + app.get('port'));
});