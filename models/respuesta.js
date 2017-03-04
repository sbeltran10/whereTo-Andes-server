var mongoose = require('mongoose');
var Pregunta = require('./pregunta.js');
var Resultado = require('./resultado.js');
var Schema = mongoose.Schema;

/* Representa un documento respuesta en mongoDB
    Registro ejemplo:
    
    "_id": "4567",
    "contenido": "Problemas academicos",
    "simbolo": "fa-graduation-cap",
    "preguntasPadre": ["3456"],
    "preguntasHijo": [],
    "resultadosHijo": ["5678"]
*/

var respuestaSchema = new Schema({
    contenido: String,
    simbolo: String,
    preguntasPadre: [Schema.Types.ObjectId],
    preguntasHijo: [Schema.Types.ObjectId],
    resultadosHijo: [Schema.Types.ObjectId]
});

// Actualiza las referencias en otros documentos
respuestaSchema.methods.actualizarReferencias = function (objId) {
    this.preguntasPadre.forEach(function (e) {
        Pregunta.update({ _id: e }, { $push: { "respuestasHijo": objId } },
            { safe: true, upsert: true }).exec();
    });

    this.preguntasHijo.forEach(function (e) {
        Pregunta.update({ _id: e }, { $push: { "respuestasPadre": objId } },
            { safe: true, upsert: true }).exec();
    });

    this.resultadosHijo.forEach(function (e) {
        Resultado.update({ _id: e }, { $push: { "respuestasPadre": objId } },
            { safe: true, upsert: true }).exec();
    });
};

module.exports = mongoose.model("Respuesta", respuestaSchema);