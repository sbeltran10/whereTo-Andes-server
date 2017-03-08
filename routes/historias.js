var router = require('express').Router();
var Historia = require('../models/historia.js');
var Usuario = require('../models/usuario.js');
var routesCommons = require('./routesCommons.js');

// Obtiene todas los historias
router.get('/', function (req, res) {
  routesCommons.darTodos(req, res, Historia);
});

// Obtiene un historia con un id especifico
router.get('/:id', function (req, res) {
  routesCommons.darDocumento(req, res, Historia);
});

// Obtiene todas las historias del usuario con el correo dado
router.get('/usuarios/:id', function (req, res) {
  Historia.find({usuario: req.params.id,}, function (err, docs) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo los documentos: ' + err);
    }
    else if (!docs) {
      res.status(500).send('No se ninguna historia');
    }
    else
      res.status(200).send(docs);
  });
});

// Actualiza un documento con el id dado
router.put('/:id', function (req, res) {
  routesCommons.actualizarDocumento(req, res, Historia);
});

// Elimina un historia con el id dado
router.delete('/:id', function (req, res) {
  routesCommons.eliminarDocumento(req, res, Historia);
});

// Registro de una nueva historia, si el body contiene id, se intentara actualizar el documento existente
router.post('/', function (req, res) {
  console.log(req.body);
  Usuario.findById(req.body.usuario, function (err, doc) {
    if (err) {
      res.status(500).send('Ocurrio un error obteniendo el documento: ' + err);
    }
    else if (!doc) {
      res.status(500).send('No se encontro al usuario');
    }
    else if (!doc.loggedIn) {
      res.status(500).send("Se agoto el tiempo de sesion");
    }
    else {
      var nuevaHistoria = new Historia({
        nombre: req.body.nombre,
        fecha: new Date(),
        usuario: doc._id,
        pasos: req.body.pasos
      });
      routesCommons.actualizarInsertar(req, res, nuevaHistoria, null);
    }
  });
});

module.exports = router;



