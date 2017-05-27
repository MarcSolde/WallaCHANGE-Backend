
mongoose = require('mongoose')

var elementSchema = new mongoose.Schema({
    titol: String,
    element_id: String,
    descripcio: String,
    imatges: [{
        path: String,
        image_id: String
    }],
    user_id: {
        type: String,
        required: true
    },
    data_publicacio: Date,
    tipus_element: String,
    es_temporal: {
        temporalitat: Boolean,
        periode: String
    },
    tags: [String],
    comentaris: [{
        text: String,
        user_id: String,
        data: Date,
        comment_id: String
    }],
    coordenades: {
        type: [Number], // [<longitude>, <latitude>]
        index: '2d'
    },
})

module.exports = mongoose.model('element', elementSchema)