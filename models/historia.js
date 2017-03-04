var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Representa un documento historia en mongoDB
    Registro ejemplo:

    "_id":"2345",
    "nombre":"Ayuda academica fisica",
    "fecha":"2016-05-18",
    "usuario":"12345",
    "pasos": [
        {
            "pregunta":"3456",
            "respuesta":"4567"
        }
    ]
*/

var historiaSchema = new Schema({
    nombre: String,
    fecha: Date,
    usuario: Schema.Types.ObjectId,
    pasos: [{
        pregunta: Schema.Types.ObjectId,
        respuesta: Schema.Types.ObjectId
    }]
});

module.exports = mongoose.model("Historia", historiaSchema);