
mongoose = require('mongoose')

var elementSchema = new mongoose.Schema({
    titol: String,
    id: String,
    descripcio: String,
    imatges: [{
        path: String,
        id: String
    }],
    user_id: {
        type: String,
        required: true
    },
    data_publicacio: Date,
    tipus_element: Boolean,
    es_temporal: {
        temporalitat: Boolean,
        periode: String
    },
    tags: [String],
    comentaris: [{
        text: String,
        user_id: String,
        data: Date,
        id: String
    }],
    coordenades: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d'
    },
}, {
    toObject: {
        transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            for (var i in ret.imatges) {
                delete ret.imatges[i]._id
                delete ret.imatges[i].path
            }
            for (var i in ret.comentaris) {
                delete ret.comentaris[i]._id
            }
        }
    },
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id
            delete ret.__v
            for (var i in ret.imatges) {
                delete ret.imatges[i]._id
                delete ret.imatges[i].path
            }
            for (var i in ret.comentaris) {
                delete ret.comentaris[i]._id
            }
        }
    }
})

module.exports = mongoose.model('element', elementSchema)
