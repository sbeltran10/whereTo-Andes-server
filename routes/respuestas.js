var router = require('express').Router();
var Respuesta = require('../models/respuesta.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todas los respuestas
router.get('/', function (req, res) {
  routesCommons.darTodos(req,res,Respuesta);
});

// Registro de una nueva respuesta, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
  var nuevaRespuesta = new Respuesta(req.body);
  routesCommons.actualizarInsertar(req, res, nuevaRespuesta, req.body._id);

});

module.exports = router;