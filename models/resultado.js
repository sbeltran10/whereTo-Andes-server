var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Representa un documento resultado en mongoDB
    Registro ejemplo:
    
    "_id":"5678",
    "nombre":"El Hexagono",
    "ubicacion":"LL_312",
    "imagen":"https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Universidad_de_los_Andes_(3326108271).jpg/300px-Universidad_de_los_Andes_(3326108271).jpg",
    "comoLlegar":"Tomar escaleras al lado de la plazoleta Lleras",
    "horario": "Lunes a Viernes, de 8:00 am - 4:00 pm",
    "respuestasPadre" :["4567"]
*/

var resultadoSchema = new Schema({
    nombre: String,
    ubicacion: String,
    imagen: String,
    comoLlegar: String,
    horario: String,
    respuestasPadre: [Schema.Types.ObjectId],
});

module.exports = mongoose.model("Resultado", resultadoSchema);