var mongoose = require("mongoose")
var usuari = mongoose.model('usuari')
'use strict'
var crypto = require('crypto')
var jwt = require('jsonwebtoken')
var config = require('../config')



var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userpassword, salt);
    return {
        salt: salt,
        passwordData: passwordData.passwordHash
    }
}

exports.addUser = function (req, res) {
    console.log("POST")
    console.log(req.body)
    var pwdHash= saltHashPassword(req.body.password);
    console.log("testtt")
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

    user.save(function (err, user) {
        if (err) return res.status(500).send(err.message)
        res.status(200).json(user)
    })
}

exports.deleteUser = function (req, res) {
    console.log("DELETE")
    console.log(req.body)
    usuari.findOne({nom_user: req.params.nom_user}, function(err, user) {
        console.log(user)
        user.remove(function (err) {
            if (err) return res.status(500).send(err.message)
            res.status(200).send()
        })
    })
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
    console.log('POST')
    console.log(req.body)
    usuari.findOne({nom_user: req.body.nom_user}, function (err, user) {
        if (err) throw err
        if (!user) {
            res.json({
                success: false,
                message: 'User nonexistant'
            })
        }
        else {
            if (user.password_hash != sha512(req.body.password, user.salt).passwordHash){
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
