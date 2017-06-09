var jwt = require('jsonwebtoken')
var mongoose = require('mongoose')
var usuari = mongoose.model('usuari')
var userSvc = require('./user.service')
var config = require('../config/config')
var https = require('https')
const uuidV4 = require('uuid/v4')
'use strict'

var login = function (req, res) {
  usuari.findOne({nom_user: req.body.nom_user}, function (err, user) {
    if (err) throw err
    if (!user) {
      res.json({
        success: false,
        message: 'User nonexistant'
      })
    } else {
      if (user.password_hash !== userSvc.login(req.body.password, user.salt).passwordHash) {
        res.json({
          success: false,
          message: 'User or password nonexistant 2'
        })
      } else {
        var token = jwt.sign(user, config.secret, {
          expiresIn: 1440
        })
        res.json({
          success: true,
          message: 'token created and given',
          token: token
        })
      }
    }
  })
}

exports.loginFB = function(token, id, callback) {

    var options = {
        //https://
        host: 'graph.facebook.com',
        path: '/me?access_token='+token
    }
    //console.log("AAAA")
    //console.log(token)
    https.request(options, function(response) {
        var str = ''
        
        response.on('data', function (chunk) {
           str += chunk;
        });
        response.on('end', function () {
            var json = JSON.parse(str)
            //console.log(json.id === id)
            if (json.id === id) {
              //console.log("AS")
                usuari.findOne({facebookId: id}, function (err, user){
                    if (err) {
                        callback(err, null)
                        //console.log('aa')
                      }
                    if (!user) {
                        var user = new usuari ({
                            nom: json.name,
                            nom_user: json.name,
                            facebookId: id,
                            id: uuidV4()
                        })
			                  user.nom_user = user.nom_user.replace(/\s/g, '');
                        //console.log('bb')
                        userSvc.saveUser(user, function(err, user) {
                            if (err) {
                                callback(err, null)
                            }
                            else {
                                token = jwt.sign(user, config.secret, {
                                    expiresIn: 1440
                                })
                                callback(err, {
                                  success: true,
                                  message: 'token created and given',
                                  token: token,
                                  nom: user.nom,
                                  nom_user: user.nom_user,
                                  facebookId: user.facebookId,
                                  productes: user.productes,
                                  reputacio: user.reputacio,
                                  intercanvis: user.intercanvis,
                                  preferencies: user.preferencies,
                                  localitat: user.localitat,
                                  path: user.path,
                                  id: user.id
                                })
                            }
                        })
                    }
                    else {
                        token = jwt.sign(user, config.secret, {
                            expiresIn: 1440
                        })
                         
                        callback(null, {
                          success: true,
                          message: 'token created and given',
                          token: token,
                          nom: user.nom,
                          nom_user: user.nom_user,
                          facebookId: user.facebookId,
                          productes: user.productes,
                          reputacio: user.reputacio,
                          intercanvis: user.intercanvis,
                          preferencies: user.preferencies,
                          localitat: user.localitat,
                          path: user.path,
                          id: user.id
                        })
                    }
                })
            }
            else {
              var err = {
                message: 'ID o Token erroni'
              }
              callback(err, null)
            }

        });   
    }).end()   
    
}

exports.checkToken = function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  if (token) {
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to auth token'

        })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided'
    })
  }
}

exports.login = login