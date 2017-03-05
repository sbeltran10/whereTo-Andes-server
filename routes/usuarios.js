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
    clave: req.body.clave
  });
  routesCommons.actualizarInsertar(req, res, nuevoUsuario, req.body._id);
});

// Login de un usuario
router.post('/login', function (req, res) {
  Usuario.findOne({ 'correo': req.body.correo }, function (err, doc) {
    if (err) {
      res.status(500).send('Ocurrio un error en el login');
    }
    else if (!doc) {
      res.status(500).send('Correo incorrecto');
    }
    else {
      doc.compararClaves(req.body.clave, function (err, isMatch) {
        if (err) {
          res.status(500).send('Ocurrio un error en el login');
        }
        else if (!isMatch) {
          res.status(500).send('Contrasena incorrecta');
        }
        else {
          // Flag de login
          Usuario.findOneAndUpdate({ correo: req.body.correo }, { loggedIn: true }, { new: true }, function (err, doc) {
            if (err) {
              res.status(500).send('No se pudo establecer el flag de loggin del documento: ' + err);
            }
            else if (!doc) {
              res.status(500).send('No se encontro el usuario');
            }
            else {
              res.status(200).send(doc);
            }
          });
        }
      });
    }

  });
});

// Logout de usuario
router.post('/logout', function (req, res) {
  Usuario.findOne({ 'correo': req.body.correo }, function (err, doc) {
    if (err) {
      res.status(500).send('Ocurrio un error en el login');
    }
    else if (!doc) {
      res.status(500).send('Correo incorrecto');
    }
    else {
      // Flag de login
      Usuario.findOneAndUpdate({ correo: req.body.correo }, { loggedIn: false }, { new: true }, function (err, doc) {
        if (err) {
          res.status(500).send('No se pudo establecer el flag de loggin del documento: ' + err);
        }
        else if (!doc) {
          res.status(500).send('No se encontro el usuario');
        }
        else {
          res.status(200).send(doc);
        }
      });
    }
  });
});

module.exports = router;





