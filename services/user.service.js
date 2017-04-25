var mongoose = require('mongoose')
var usuari = mongoose.model('usuari')
'use strict'
var crypto = require('crypto')
var multer = require('multer')

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../uploads');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now()+file.originalname );
  }
});

var upload = multer({ storage : storage}).single('userPhoto');

var genRandomString = function (length) {
  return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length)
}

var sha512 = function (password, salt) {
  var hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  var value = hash.digest('hex')
  return {
    salt: salt,
    passwordHash: value
  }
}

function saltHashPassword (userpassword) {
  var salt = genRandomString(16)
  var passwordData = sha512(userpassword, salt)
  return {
    salt: salt,
    passwordData: passwordData.passwordHash
  }
}

exports.createUser = function (req) {
  var pwdHash = saltHashPassword(req.body.password)
  var user = new usuari({
    nom: req.body.nom,
    nom_user: req.body.nom_user,
    password_hash: pwdHash.passwordData.toString(),
    salt: pwdHash.salt.toString(),
    path: req.body.path,
    localitat: req.body.localitat,
    preferencies: req.body.preferencies,
    productes: req.body.productes,
    intercanvis: req.body.intercanvis,
    reputacio: req.body.reputacio
  })
  return user
}

exports.saveUser = function (user, callback) {
  user.save(function (err, user) {
    callback(err, user)
  })
}

exports.deleteUser = function (user, callback, res) {
  user.remove(function (err) {
    callback(err)
  })
}

exports.findUser = function (req) {
  return usuari.findOne({nom_user: req.params.nom_user})
}

exports.login = function (password, salt) {
    return sha512(password, salt)
}

exports.updateUser = function(req, callback) {
    usuari.findOne({nom_user: req.params.nom_user}, function (err, user) {
        if (req.body.password) {
            var pwdHash= saltHashPassword(req.body.password)
            user.password_hash = pwdHash.passwordData
            user.salt = pwdHash.salt
        }
        if (req.body.path) user.path = req.body.path
        if (req.body.localitat) user.localitat = req.body.localitat
        if (req.body.preferencies)user.preferencies = req.body.preferencies
        if (req.body.productes)user.productes = req.body.productes
        if (req.body.intercanvis)user.intercanvis = req.body.intercanvis
        if (req.body.reputacio)user.reputacio = req.body.reputacio
        
        callback(user);
    })
}

exports.getUser = function(req, callback) {
  usuari.findOne({nom_user: req.params.nom_user}, function(err, user) {
    callback(err, user)
  })
}

exports.getAllUsers = function(callback) {
  usuari.find({}, function(err, llista) {
    callback(err, llista)
  })
}

exports.afegirImatge = function(req, res, callback) {
  upload(req,res, function(err) {
    callback(err)
  })
}
