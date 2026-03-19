const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

const app = express(); // Primero creamos la app

//-------------- CONFIGURACIONES --------------
app.set('view engine', 'ejs'); // Corregido: sin la "s"
app.set('views', path.join(__dirname, 'views'));

//-------------- MIDDLEWARES --------------
app.use(session({
    secret: 'secret', 
    resave: false, 
    saveUninitialized: false // Corregido: saveUninitialized
}));
app.use(flash());

// Archivos estáticos
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//-------------- RUTAS --------------
app.get('/', (req, res) => {
    let message = req.flash('message');
    res.render('index', { data: message });
});

app.get('/altas_alumnos', (req, res) => {
    res.render('altas_alumnos');
});

app.get('/cambios', (req, res) => {
    res.render('cambios');
});

app.get('/consulta', (req, res) => {
    res.render('consulta');
});

// Rutas de API/Módulos
const alumno_rutas = require('./routes/alumnos_routes');
app.use('/alumnos', alumno_rutas); // Agregada la /

//-------------- LEVANTAR SERVIDOR --------------
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});