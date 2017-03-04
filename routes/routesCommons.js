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

// Metodo generico para insertar o actualizar un registro en una coleccion, si el body contiene id, se intentara actualizar el documento existente
exports.actualizarInsertar = function (req, res, nuevoModelo, id) {
    if (id) {
        var upsertData = nuevoModelo.toObject();
        delete upsertData._id;
        nuevoModelo.constructor.findOneAndUpdate({ _id: id }, upsertData, { new: true }, function (err, doc) {
            if (err) {
                res.status(500).send('No se pudo actualizar el documento');
                console.log(err);
            }
            else {
                if (nuevoModelo.methods) nuevoModelo.actualizarReferencias(id);
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
                if (nuevoModelo.actualizarReferencias) nuevoModelo.actualizarReferencias(doc._id);
                res.status(200).send(doc);
            }
        });

    }
};