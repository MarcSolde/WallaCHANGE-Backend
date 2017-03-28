
mongoose = require('mongoose')

var elementSchema = new mongoose.Schema({
    titol: String,
    descripcio: String,
    imatges: [String],
    nom_user: {
        type: String,
        unique: true,
        required: true
    },
    data_publicacio: Date,
    tipus_element: String,
    es_temporal: Boolean,
    tags: [String],
    comentaris: [{
        comentari: String,
        usuari: String
    }],
    coordenades: {
        x: Number,
        y: Number
    },
});

module.exports = mongoose.model('element', elementSchema);