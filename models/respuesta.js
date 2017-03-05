var mongoose = require('mongoose');
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
    contenido: { type: String, required: true },
    simbolo: String,
    preguntasPadre: [Schema.Types.ObjectId],
    preguntasHijo: [Schema.Types.ObjectId],
    resultadosHijo: [Schema.Types.ObjectId]
});

// Actualiza las referencias en otros documentos
respuestaSchema.methods.actualizarReferencias = function (objId, preguntaConst, resultadoConst) {
    this.preguntasPadre.forEach(function (e) {
        preguntaConst.update({ _id: e }, { $push: { "respuestasHijo": objId } },
            { safe: true, upsert: true }).exec();
    });

    this.preguntasHijo.forEach(function (e) {
        preguntaConst.update({ _id: e }, { $push: { "respuestasPadre": objId } },
            { safe: true, upsert: true }).exec();
    });

    this.resultadosHijo.forEach(function (e) {
        resultadoConst.update({ _id: e }, { $push: { "respuestasPadre": objId } },
            { safe: true, upsert: true }).exec();
    });
};

module.exports = mongoose.model("Respuesta", respuestaSchema);