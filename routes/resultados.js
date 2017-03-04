var router = require('express').Router();
var Resultado = require('../models/resultado.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todos los resultados
router.get('/', function (req, res) {
    routesCommons.darTodos(req, res, Resultado);
});

// Registro de un nuevo resultado, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
    var nuevoResultado = new Resultado(req.body);
    routesCommons.actualizarInsertar(req, res, nuevoResultado, req.body._id);
});

module.exports = router;





