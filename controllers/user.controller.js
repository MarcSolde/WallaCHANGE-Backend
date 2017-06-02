var userSvc = require('../services/user.service')

exports.addUser = function (req, res) {
  var usuari = userSvc.createUser(req)
  userSvc.saveUser(usuari, function (err, nErr) {
    console.log(usuari)
    jsonReturn(res, err, usuari)
  })
}

exports.deleteUser = function (req, res) {
  userSvc.deleteUser(userSvc.findUser(req), function (err) {
    if (err) res.status(500).send(err.message)
    else res.status(200).send()
  })
}

exports.updateUser = function (req, res) {
    userSvc.updateUser(req, function(usuari) {
        userSvc.saveUser(usuari, function(err){
            jsonReturn(res, err, usuari)
        })
    })
  }

exports.getUser = function (req, res) {
  userSvc.getUser(req, function (err, user) {
    if (err) res.status(500).send(err.message)
    else {
      res.status(200).send(user)
    }
  })
}

exports.getAllUsers = function(req, res) {
  userSvc.getAllUsers(function(err, llistaUsers) {
    llistaReturn(res, err, llistaUsers)
  })
}

exports.afegirImatge = function (req, res) {
  userSvc.afegirImatge(req, res, function (err) {
    if (err) res.status(500).send(err.message)
    else res.status(200).send('Image uploaded')
  })
}

exports.login = function (req, res) {
  userSvc.login(req, res)
}

exports.getImatge = function (req, res) {
  userSvc.getImatge(req, function (err, pathProfilePic) {
    if (err) res.status(500).send(err.message)
    else {
      res.status(200)
      res.sendFile(pathProfilePic)
    }
  })
}

exports.getUserBySearch = function(req, res) {
  userSvc.getUserBySearch(req, function(err, llistaUsers) {
    llistaReturn(res, err, llistaUsers)
  })
}

stdReturn = function(res, err, object) {

}

jsonReturn = function(res, err, object){
  if (err) res.status(500).send(err.message)
  else res.status(200).json(object)
}

llistaReturn = function(res, err, llista) {
  if (err) res.status(500).send(err.message)
  else {
    res.status(200).send(llista)
  }
}


  