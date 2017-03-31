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
    userSvc.deleteUser(req, res)
}

exports.updateUser = function (req, res) {
    console.log("PUT")
    console.log(req.body)

    if (req.body.password) var pwdHash= saltHashPassword(req.body.password);
    usuari.findOne({nom_user: req.params.nom_user}, function (err, user) {

        if (req.body.password) {
            user.password_hash = pwdHash.passwordData
            user.salt = pwdHash.salt
        }
        if (req.body.path) user.path = req.body.path
        if (req.body.localitat) user.localitat = req.body.localitat
        if (req.body.preferencies)user.preferencies = req.body.preferencies
        if (req.body.productes)user.productes = req.body.productes
        if (req.body.intercanvis)user.intercanvis = req.body.intercanvis
        if (req.body.reputacio)user.reputacio = req.body.reputacio

        user.save(function (err) {
            if (err) return res.status(500).send(err.message)
            res.status(200).jsonp(user)

        })
    })

}

exports.login = function (req, res) {
    userSvc.login(req, res)
}