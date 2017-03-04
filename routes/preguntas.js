var router = require('express').Router();
var Pregunta = require('../models/pregunta.js');

// Obtiene todas las preguntas
router.get('/', function (req, res) {
  Pregunta.find(function (err, docs) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo los datos');
    }
    else
      res.status(200).send(docs);
  });
});

// Registro de una nueva pregunta
router.post('/', function (req, res) {
  var nuevaPregunta = new Pregunta({
    contenido: req.body.contenido,
    respuestasPadre: req.body.respuestasPadre,
    respuestasHijo: req.body.respuestasHijo
  });

  nuevaPregunta.save(function (err, doc, numAffected) {
    if(err){
      res.status(500).send('No se pudo insertar la pregunta');
    }
    else
      res.status(200).send(doc);
  });

});

module.exports = router;