var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Representa un documento pregunta en mongoDB
    Registro ejemplo:
    
    "_id":"3456",
    "contenido":"¿Que tipo de problemas tienes?",
    "respuestasPadre" :[],
    "respuestasHijo":["4567"]
*/

var preguntaSchema = new Schema({
    contenido: { type: String, required: true },
    respuestasPadre: [Schema.Types.ObjectId],
    respuestasHijo: [Schema.Types.ObjectId]
});

// Actualiza las referencias en otros documentos
preguntaSchema.methods.actualizarReferencias = function (objId, respuestaConst) {
    this.respuestasPadre.forEach(function (e) {
        Respuesta.update({ _id: e }, { $push: { "preguntasHijo": objId } },
            { safe: true, upsert: true }).exec();
    });

    this.respuestasHijo.forEach(function (e) {
        Respuesta.update({ _id: e }, { $push: { "preguntasPadre": objId } },
            { safe: true, upsert: true }).exec();
    });
};

module.exports = mongoose.model("Pregunta", preguntaSchema);