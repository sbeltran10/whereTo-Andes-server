var router = require('express').Router();
var Pregunta = require('../models/pregunta.js');
var Respuesta = require('../models/respuesta.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todas las preguntas
router.get('/', function (req, res) {
  routesCommons.darTodos(req, res, Pregunta);
});

// Actualiza un documento con el id dado
router.put('/:id', function (req, res) {
  routesCommons.actualizarDocumento(req, res, Pregunta);
});

// Elimina un pregunta con el id dado
router.delete('/:id', function (req, res) {
  routesCommons.eliminarDocumento(req, res, Pregunta);
});

// Obtiene una pregunta junto con sus posibles respuestas
router.get('/:id', function (req, res) {
  Pregunta.findById(req.params.id, '_id contenido', function (err1, doc) {
    if (err1) {
      res.status(500).send('Ocurrio un error obteniendo la pregunta');
    }
    else if(!doc){
      res.status(500).send('No se encontro la pregunta');
    }
    else {
      Respuesta.find({ preguntasPadre: doc._id }, '_id contenido simbolo', function (err2, docs) {
        if (err2) {
          res.status(500).send('Ocurrio un error obteniendo las respuestas');
        }
        else {
          console.log(docs);
          var body = doc.toJSON();
          body.respuestas = docs;
          res.status(200).send(body);
        }
      });
    }
  });
});

// Registro de una nueva pregunta, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
  var nuevaPregunta = new Pregunta(req.body);
  routesCommons.actualizarInsertar(req, res, nuevaPregunta, req.body._id);

});

module.exports = router;