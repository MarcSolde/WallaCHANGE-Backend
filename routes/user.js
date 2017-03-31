var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var userCtrl = require('../controllers/user')
var authCtrl = require('../controllers/auth')
var auth = require('./auth')
//Non-auth
router.use(function (req, res, next) {
    next()
})

router.post('/addUser', userCtrl.addUser)
router.post('/login', auth.login)
router.post('/loginFB', auth.loginFB)
router.use(authCtrl.checkToken)
//Auth needed
router.delete('/deleteUser/:nom_user', userCtrl.deleteUser)

module.exports = router