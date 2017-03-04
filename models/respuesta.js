var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Representa un documento respuesta en mongoDB
    Registro ejemplo:
    
    "_id": "4567",
    "contenido": "Problemas academicos",
    "simbolo": "fa-graduation-cap",
    "ids_preguntas_padre": ["3456"],
    "ids_preguntas_hijo": [],
    "ids_resultados_hijo": ["5678"]
*/

var respuestaSchema = new Schema({
    contenido: String,
    simbolo: String,
    preguntasPadre: [Schema.Types.ObjectId],
    preguntassHijo: [Schema.Types.ObjectId],
    resultadosHijo: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Respuesta", respuestaSchema);