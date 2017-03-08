// Script principal

// Importar librerias principales
var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Conexion a la base de datos
const DB_URI = 'mongodb://heroku_cl5chmxx:hob4t7pao4kqp7gmjrgppk4pj@ds113680.mlab.com:13680/heroku_cl5chmxx';
mongoose.connect(DB_URI);

// Importar rutas
var usuarios = require('./routes/usuarios');
var preguntas = require('./routes/preguntas');
var respuestas = require('./routes/respuestas');
var resultados = require('./routes/resultados');
var historias = require('./routes/historias');

// Configuracion de rutas y el parser para JSON
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use('/usuarios', usuarios);
app.use('/preguntas', preguntas);
app.use('/respuestas', respuestas);
app.use('/resultados', resultados);
app.use('/historias', historias);


// Pagina por defecto
app.get('/', (req, res) => {
  res.status(200).send('Where to Andes');
});

// Puerto para la escucha de peticiones
app.listen(process.env.PORT||3000);
