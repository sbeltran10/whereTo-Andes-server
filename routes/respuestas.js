var router = require('express').Router();
var Respuesta = require('../models/respuesta.js');

// Obtiene todas los respuestas
router.get('/', function (req, res) {
  Respuesta.find(function (err, docs) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo los datos');
    }
    else
      res.status(200).send(docs);
  });
});

// Registro de una nueva respuesta
router.post('/', function (req, res) {
  var nuevaRespuesta = new Respuesta({
    contenido: req.body.contenido,
    simbolo: req.body.simbolo,
    preguntasPadre: req.body.preguntasPadre,
    preguntasHijo: req.body.preguntasHijo,
    resultadosHijo: req.body.resultadosHijo
  });

  nuevaRespuesta.save(function (err, doc, numAffected) {
    if(err){
      res.status(500).send('No se pudo insertar la respuesta');
    }
    else
      res.status(200).send(doc);
  });

});

module.exports = router;