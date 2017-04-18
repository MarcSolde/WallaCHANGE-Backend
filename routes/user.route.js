var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var userCtrl = require('../controllers/user.controller')
var authCtrl = require('../controllers/auth.controller')
var auth = require('./auth.route')
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
router.put('/updateUser/:nom_user', userCtrl.updateUser)

module.exports = router