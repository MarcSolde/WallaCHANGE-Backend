var express = require('express')
var router = express.Router()
var userCtrl = require('../controllers/user.controller')
var authCtrl = require('../controllers/auth.controller')
var auth = require('./auth.route')
// Non-auth
router.use(function (req, res, next) {
  next()
})

router.post('/user', userCtrl.addUser)
router.get('/user', userCtrl.getUserBySearch)
router.get('/user/:id', userCtrl.getUser)
router.get('/users', userCtrl.getAllUsers)
router.get('/user/:id/image', userCtrl.getImatge)
router.post('/login', auth.login)
router.post('/loginFB', auth.loginFB)
router.use(authCtrl.checkToken)
// Auth needed
router.post('/image/:id', userCtrl.afegirImatge)
router.delete('/user/:id', userCtrl.deleteUser)
router.put('/user/:id', userCtrl.updateUser)

module.exports = router
