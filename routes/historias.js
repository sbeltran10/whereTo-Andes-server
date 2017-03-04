var router = require('express').Router();
var Historia = require('../models/historia.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todas los historias
router.get('/', function (req, res) {
  routesCommons.darTodos(req, res, Historia);
});

// Registro de una nueva historia, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
  var nuevaHistoria = new Historia(req.body);
  routesCommons.actualizarInsertar(req, res, nuevaHistoria, req.body._id);

});

module.exports = router;



