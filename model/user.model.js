var mongoose = require('mongoose')
var counter = require('./counter.model')

var userSchema = new mongoose.Schema({
  testvalue: String,
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
  facebookId: String,
  twitter: [
    {
      id: String,
      name: String
    }
  ]
})

userSchema.pre('save', function (next) {
  var doc = this
  counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1}},{ "upsert": true, "new": true }, function(error, counter) {
    if (error) return next(error)
    doc.testvalue = counter.seq // utilitzar-lo per veure els valors que prenen els identificadors.
    next()
  })
})

module.exports = mongoose.model('usuari', userSchema)
