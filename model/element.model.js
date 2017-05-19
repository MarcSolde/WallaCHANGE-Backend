
mongoose = require('mongoose')

var elementSchema = new mongoose.Schema({
  titol: {
    type: String,
    required: true
  },
  descripcio: String,
  imatges: {
    type: [{ path: String }],
    required: false
  },
  nom_user: {
    type: String,
    required: true
  },
  data_publicacio: Date,
  tipus_element: String,
  es_temporal: String,
  tags: [String],
  comentaris: [{
    text: String,
    nom_user: String
  }],
  localitat: String,
  coordenades: {
    x: String,
    y: String
  }
})

module.exports = mongoose.model('element', elementSchema)
