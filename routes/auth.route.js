var authCtrl = require('../controllers/auth.controller')

exports.login = function (req, res, next) {
  authCtrl.login(req, res, next)
}

exports.loginFB = function (req, res, next) {
  authCtrl.loginFB(req, res, next)
}
