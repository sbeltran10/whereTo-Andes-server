var router = require('express').Router();
var Usuario = require('../models/usuario.js');

// Obtiene todos los usuarios
router.get('/', function (req, res) {
  Usuario.find(function (err, docs) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo los datos');
    }
    else
      res.status(200).send(docs);
  });
});

// Registro de un nuevo usuario
router.post('/', function (req, res) {
  var nuevoUsuario = new Usuario({
    nombre: req.body.nombre,
    correo: req.body.correo,
    // Pensar en cifrar
    clave: req.body.clave
  });

  nuevoUsuario.save(function (err, doc, numAffected) {
    if (err) {
      res.status(500).send('No se pudo insertar el usuario');
    }
    else
      res.status(200).send(doc);
  });

});

// Login de un usuario
router.post('/login', function (req, res) {
  //TODO
});

module.exports = router;





