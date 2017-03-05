var Pregunta = require('../models/pregunta.js');
var Respuesta = require('../models/respuesta.js');
var Resultado = require('../models/resultado.js');

// Metodo generico para retornar todos los documentos de una coleccion
exports.darTodos = function (req, res, model) {
    model.find(function (err, docs) {
        if (err) {
            res.status(500).send('Ocurrio un error obteniendo los datos');
        }
        else
            res.status(200).send(docs);
    });
};

// Metodo generico para obtener un modelo con un id especifico
exports.darDocumento = function (req, res, model) {
    model.findById(req.params.id, function (err, doc) {
        if (err) {
            res.status(500).send('Ocurrio un error obteniendo el documento');
        }
        else if (!doc) {
            res.status(500).send('No se encontro el documento');
        }
        else
            res.status(200).send(doc);
    });
}

// Metodo para actualizar un documento dado su id
exports.actualizarDocumento = function (req, res, model) {
    if (req.params.id) {
        model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, doc) {
            if (err) {
                res.status(500).send('No se pudo actualizar el documento');
            }
            else if (!doc) {
                res.status(500).send('No se encontro el documento');
            }
            else {
                if (doc.methods) actualizarRefsModelo(id, nuevoModelo);
                res.status(200).send(doc);
            }
        });
    }
    else {
        res.status(500).send('Id invalido');
    }

}

// Metodo generico para insertar un documento en una coleccion, si por alguna razon el body contiene un id, se intentara actualizar el documento
exports.actualizarInsertar = function (req, res, nuevoModelo, id) {
    if (id) {
        var upsertData = nuevoModelo.toObject();
        delete upsertData._id;
        nuevoModelo.constructor.findOneAndUpdate({ _id: id }, upsertData, { new: true }, function (err, doc) {
            if (err) {
                res.status(500).send('No se pudo actualizar el documento');
            }
            else if (!doc) {
                res.status(500).send('No se encontro el documento');
            }
            else {
                if (nuevoModelo.methods) actualizarRefsModelo(id, doc);
                res.status(200).send(doc);
            }
        });
    }

    else {
        nuevoModelo.save(function (err, doc, numAffected) {
            if (err) {
                res.status(500).send('No se pudo insertar el documento');
            }
            else {
                if (nuevoModelo.actualizarReferencias) actualizarRefsModelo(doc._id, nuevoModelo);
                res.status(200).send(doc);
            }
        });

    }
};

// Metodo que realiza la rspectiva actualizacion de referencias dependiendo de cual elemento llega por parametro
var actualizarRefsModelo = function (id, modelo) {
    switch (modelo.constructor.modelName) {
        case 'Pregunta':
            modelo.actualizarReferencias(id, Respuesta);
            break;
        case 'Respuesta':
            modelo.actualizarReferencias(id, Pregunta, Resultado);
            break;
        case 'Resultado':
            modelo.actualizarReferencias(id, Respuesta);
            break;
        default:
            "Error"
    }
}
