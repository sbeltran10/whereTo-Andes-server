var router = require('express').Router();
var Resultado = require('../models/resultado.js');

// Obtiene todos los resultados
router.get('/', function (req, res) {
  Resultado.find(function (err, docs) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo los datos');
    }
    else
      res.status(200).send(docs);
  });
});

// Registro de un nuevo resultado
router.post('/', function (req, res) {
    var nuevoResultado = new Resultado({
        nombre: req.body.nombre,
        ubicacion: req.body.ubicacion,
        imagen: req.body.imagen,
        comoLlegar: req.body.comoLlegar,
        horario: req.body.horario,
        respuestasPadre: req.body.respuestasPadre,
    });

    nuevoResultado.save(function (err, doc, numAffected) {
        if (err) {
            res.status(500).send('No se pudo insertar el resultado');
        }
        else
            res.status(200).send(doc);
    });

});

module.exports = router;





