var router = require('express').Router();
var Respuesta = require('../models/respuesta.js');
var Pregunta = require('../models/pregunta.js');
var Resultado = require('../models/resultado.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todas los respuestas
router.get('/', function (req, res) {
  routesCommons.darTodos(req, res, Respuesta);
});

// Obtiene una respuesta junto con su siguiente pregunta o resultado dado el caso
router.get('/:id', function (req, res) {
  // Se obtiene la respuesta
  Respuesta.findById(req.params.id, function (err1, docresp) {
    if (err1) {
      res.status(500).send('Ocurrio un error obteniendo la respuesta');
    }
    else {
      // Se determina si la respuesta conduce a un resultado o a una pregunta
      // Resultado
      if (docresp.resultadosHijo.length) {
        Resultado.findById(docresp.resultadosHijo[0], function (err1, docresu) {
          if (err2) {
            res.status(500).send('Ocurrio un error obteniendo el resultado');
          }
          else {
            var body = { esResultado: true };
            body.resultado = docresu;
            res.status(200).send(body);
          }
        })
      }
      // Pregunta
      else {
        Pregunta.findById(docresp.preguntasHijo[0], '_id contenido', function (err1, docpreg) {
          if (err1) {
            res.status(500).send('Ocurrio un error obteniendo la pregunta');
          }
          else {
            Respuesta.find({ preguntasPadre: docpreg._id }, '_id contenido simbolo', function (err2, docs) {
              if (err2) {
                res.status(500).send('Ocurrio un error obteniendo las respuestas');
              }
              else {
                var body = { esResultado: false };
                body.pregunta = docpreg.toJSON();
                body.pregunta.respuestas = docs;
                res.status(200).send(body);
              }
            });
          }
        });
      }
    }
  });
});

// Registro de una nueva respuesta, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
  var nuevaRespuesta = new Respuesta(req.body);
  routesCommons.actualizarInsertar(req, res, nuevaRespuesta, req.body._id);

});

module.exports = router;