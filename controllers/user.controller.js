/*var mongoose = require("mongoose")
 var usuari = mongoose.model('usuari')
 'use strict'
 var crypto = require('crypto')
 var jwt = require('jsonwebtoken')
 var config = require('../config')
 */

var userSvc = require('../services/user.service')

/*exports.addUser = function (req, res) {
 var usuari = userSvc.createUser(req)
 var estatSvc = userSvc.saveUser(usuari)
 if (typeof(estatSvc) == typeof({a:"a", b:"b"})) {
 console.log("hola")
 res.status(500).send(estatSvc.message)
 }
 else res.status(200).json(usuari)
 }*/

exports.addUser = function (req, res) {
    var usuari = userSvc.createUser(req)
    var estatSvc = userSvc.saveUser(usuari, function (err, nErr) {
        if (err) {
            console.log("hola")
            res.status(500).send(err.message)
        }
        else res.status(200).json(usuari)
    })


}

exports.deleteUser = function (req, res) {
    userSvc.deleteUser(userSvc.findUser(req), function(err) {
        if (err) res.status(500).send(err.message)
        else res.status(200).send()
    })
}

exports.updateUser = function (req, res) {
    console.log("PUT")

    userSvc.updateUser(req, function(usuari) {
        console.log(usuari)
        userSvc.saveUser(usuari, function(err){
            if (err) res.status(500).send(err.message)
            else res.status(200).json(usuari)
        })
    })
    
}

exports.login = function (req, res) {
    userSvc.login(req, res)
}