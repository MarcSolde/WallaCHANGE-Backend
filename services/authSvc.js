var jwt = require('jsonwebtoken')
var usuari = mongoose.model('usuari')
var userSvc = require('./userSvc')
var config = require('../config')
'use strict'


exports.login = function (req, res) {
    usuari.findOne({nom_user: req.body.nom_user}, function (err, user) {
        if (err) throw err
        if (!user) {
            res.json({
                success: false,
                message: 'User nonexistant'
            })
        }
        else {
            if (user.password_hash != userSvc.login(req.body.password, user.salt).passwordHash){
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

exports.checkToken = function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err){
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