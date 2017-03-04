var router = require('express').Router();
var Historia = require('../models/historia.js');

// Obtiene todas los historias
router.get('/', function (req, res) {
  Historia.find(function (err, docs) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo los datos');
    }
    else
      res.status(200).send(docs);
  });
});

// Registro de una nueva historia
router.post('/', function (req, res) {
  var nuevaHistoria = new Historia({
    nombre: res.body.nombre,
    fecha: res.body.fecha,
    usuario: res.body.usuario,
    pasos: res.body.pasos
  });

  nuevaHistoria.save(function (err, doc, numAffected) {
    if(err){
      res.status(500).send('No se pudo insertar la historia');
    }
    else
      res.status(200).send(doc);
  });

});

module.exports = router;



