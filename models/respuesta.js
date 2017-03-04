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
    contenido: String,
    simbolo: String,
    preguntasPadre: [Schema.Types.ObjectId],
    preguntasHijo: [Schema.Types.ObjectId],
    resultadosHijo: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Respuesta", respuestaSchema);