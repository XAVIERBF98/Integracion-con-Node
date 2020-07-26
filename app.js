//Requires
var express = require('express');
var mongose = require('mongoose');
var bodyparser = require('body-parser');
var hbs = require('hbs');
//Inicializar Variables
var app = express();

//Body Parser
//parse aplicacion  /x--www-form -urlecoded
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');



mongose.connection.openUri('mongodb+srv://Xavier:3107635251@cluster0.ladrt.gcp.mongodb.net/IntegracionMdb?retryWrites=true&w=majority', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: \x1b[31m%s\x1b[0m', 'online')
});
//Rutas

app.use('/registro/usuario', usuarioRoutes);
app.use('/usuario', usuarioRoutes);
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');
app.get('/', (req , res) => {
    res.render('home');
});
app.get('/registro', (req, res) => {
    
    res.render('Registro');
});



//Escuchar Expres
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[31m%s\x1b[0m', 'online');
});