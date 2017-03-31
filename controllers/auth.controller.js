var authSvc = require('../services/auth.service')

exports.login = function (req, res) {
    authSvc.login(req, res)
}

exports.loginFB = function (req, res) {
	var login = authSvc.loginFB(req.body.id, req.body.name, function(err, token) {
		if (err)
			res.status(500).send(err.message)
		else res.status(200).json(token)
	})
}

exports.loginTW = function(req, res) {
	var login = authSvc.loginTW(req.body.id, req.body.name, function(err, token) {
		if (err)
			res.status(500).send(err.message)
		else res.status(200).json(token)
	})
}

exports.checkToken = function (req, res, next) {
    authSvc.checkToken(req, res, next)
}