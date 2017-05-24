var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    nom: String,
    nom_user: {
        type: String,
        unique: true,
        required: true
    },
    password_hash: {
        type: String,
        default: ''
    },
    salt: {
        type: String,
        default: ''
    },
    path: {
        type: String,
        default: ''
        
    },
    localitat: {
        type: String,
        default: ''
    },
    preferencies: {
        type: Array,
        default: []
    },
    productes: {
        type: Array,
        default: []
    },
    intercanvis: {
        type: Array,
        default: []
    },
    reputacio: {
        type: Number,
        default: 50
    },
    facebookId: String,
    twitterId: String,

})

module.exports = mongoose.model('usuari', userSchema)
