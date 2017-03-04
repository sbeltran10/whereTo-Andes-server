var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Representa un documento pregunta en mongoDB
    Registro ejemplo:
    
    "_id":"3456",
    "contenido":"¿Que tipo de problemas tienes?",
    "ids_respuestas_padre" :[],
    "ids_respuestas_hijo":["4567"]
*/

var preguntaSchema = new Schema({
    contenido: String,
    respuestasPadre: [Schema.Types.ObjectId],
    respuestasHijo: [Schema.Types.ObjectId]
});

module.exports = mongoose.model("Pregunta", preguntaSchema);