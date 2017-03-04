var router = require('express').Router();
var Usuario = require('../models/usuario.js');

// Registro de un nuevo usuario
router.post('/', function(req,res){
  new Usuario({
    nombre: req.body.nombre,
    correo: req.body.correo,
    // Pensar en cifrar
    clave: req.body.clave
  }).save();
  
  res.sendStatus(200)
});

// Login de un usuario
router.post('/login', function(req,res){
  new Usuario({
    nombre: req.body.nombre,
    correo: req.body.correo,
    // Pensar en cifrar
    clave: req.body.clave
  });
});

module.exports = router;





