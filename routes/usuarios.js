var router = require('express').Router();
var Usuario = require('../models/usuario.js');
var routesCommons = require('./routesCommons.js');


// Obtiene todos los usuarios
router.get('/', function (req, res) {
  routesCommons.darTodos(req, res, Usuario);
});

// Obtiene un usuario con un id especifico
router.get('/:id', function (req, res) {
  routesCommons.darDocumento(req, res, Usuario);
});

// Actualiza un documento con el id dado
router.put('/:id', function (req, res) {
  routesCommons.actualizarDocumento(req, res, Usuario);
});

// Elimina un usuario con el id dado
router.delete('/:id', function (req, res) {
  routesCommons.eliminarDocumento(req, res, Usuario);
});

// Registro de un nuevo usuario
router.post('/', function (req, res) {
  var nuevoUsuario = new Usuario({
    nombre: req.body.nombre,
    correo: req.body.correo,
    // Pensar en cifrar
    clave: req.body.clave
  });
  routesCommons.actualizarInsertar(req, res, nuevoUsuario, req.body._id);
});

// Login de un usuario
router.post('/login', function (req, res) {
  //TODO
});

module.exports = router;





