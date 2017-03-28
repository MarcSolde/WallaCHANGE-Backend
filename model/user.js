mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    nom: String,
    nom_user: {
        type: String,
        unique: true,
        required: true
    },
    password_hash: String,
    salt: String,
    path: {
        type: String,
        default: ''
    },
    localitat: {
        type: String,
        default: ''
    },
    preferencies: [String],
    productes: [String],
    intercanvis: [String],
    reputacio: {
        type: String,
        default: ''
    },

})

module.exports = mongoose.model('usuari', userSchema)