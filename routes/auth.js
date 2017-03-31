var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var authCtrl = require('../controllers/auth')

exports.login = function (req, res, next) {
    authCtrl.login(req, res, next)
}

exports.loginFB = function (req, res, next) {
	authCtrl.loginFB(req, res, next)
}