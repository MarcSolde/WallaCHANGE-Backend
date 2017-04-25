var mongoose = require('mongoose')
var counter = require('./counter.model.js')

var elementSchema = new mongoose.Schema({
  testvalue: String,
  titol: String,
  descripcio: String,
  imatges: [String],
  nom_user: {
    type: String,
    required: true
  },
  data_publicacio: Date,
  tipus_element: String,
  es_temporal: Boolean,
  tags: [String],
  comentaris: [{
    textComentari: String,
    usuari: String
  }],
  coordenades: {
    x: Number,
    y: Number
  }
})

elementSchema.pre('save', function (next) {
  var doc = this
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1}},{ "upsert": true, "new": true }, function(error, counter) {
    if (error) return next(error)
    doc.testvalue = counter.seq // utilitzar-lo per veure els valors que prenen els identificadors.
    next()
  })
})

module.exports = mongoose.model('element', elementSchema)
