
mongoose = require('mongoose')

var elementSchema = new mongoose.Schema({
  titol: String,
  descripcio: String,
  imatges: [{
    path: String
  }],
  nom_user: {
    type: String,
    required: false
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
