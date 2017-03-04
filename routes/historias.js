var router = require('express').Router();
var Historia = require('../models/historia.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todas los historias
router.get('/', function (req, res) {
  routesCommons.darTodos(req, res, Historia);
});

// Obtiene un usuario con un id especifico
router.get('/:id', function (req, res) {
  routesCommons.darDocumento(req,res,Historia);
});

// Actualiza un documento con el id dado
router.put('/:id', function (req, res) {
  routesCommons.actualizarDocumento(req, res, Historia);
});

// Registro de una nueva historia, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
  var nuevaHistoria = new Historia(req.body);
  routesCommons.actualizarInsertar(req, res, nuevaHistoria, req.body._id);

});

module.exports = router;



