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
    num_valoracions: {
        type: Number,
        default: 0
    },
    facebookId: String,
    twitterId: String,
    id: String

}, {
    toObject: {
        transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.facebookId
            delete ret.twitterId
            delete ret.salt
            delete ret.password_hash
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            delete ret.facebookId
            delete ret.twitterId
            delete ret.salt
            delete ret.password_hash
        }
    }
})

module.exports = mongoose.model('usuari', userSchema)
