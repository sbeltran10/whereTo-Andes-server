var mongoose = require('mongoose');
var Schema = mongoose.Schema;
bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;

/* Representa un documento usuario en mongoDB
    Registro ejemplo:
    
    "_id":"12345",
    "nombre":"Santiago Beltran",
    "correo":"sbeltran10@uniandes.edu.co",
    "clave":"123"
*/

var usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    clave: { type: String, required: true },
    loggedIn: { type: Boolean, default: false}
});

// Encriptacion de la contrasena
usuarioSchema.pre('save', function (next) {
    var usuario = this;
    if (!usuario.isModified('clave')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(usuario.clave, salt, function (err, hash) {
            if (err) return next(err);

            usuario.clave = hash;
            next();
        });
    });
});

// Comparacion de contrasena
usuarioSchema.methods.compararClaves = function (claveCandidata, cb) {
    bcrypt.compare(claveCandidata, this.clave, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model("Usuario", usuarioSchema);