var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* Representa un documento usuario en mongoDB
    Registro ejemplo:
    
    "_id":"12345",
    "nombre":"Santiago Beltran",
    "correo":"sbeltran10@uniandes.edu.co",
    "clave":"123"
*/

var usuarioSchema = new Schema({
    nombre: String,
    correo: String,
    clave: String
});

module.exports = mongoose.model("Usuario", usuarioSchema);