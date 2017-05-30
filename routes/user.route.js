var express = require('express')
var router = express.Router()
var userCtrl = require('../controllers/user.controller')
var authCtrl = require('../controllers/auth.controller')
var auth = require('./auth.route')
// Non-auth
router.use(function (req, res, next) {
  next()
})

router.post('/addUser', userCtrl.addUser)
router.get('/user', userCtrl.getUserBySearch)
router.get('/user/:id', userCtrl.getUser)
router.get('/allUsers', userCtrl.getAllUsers)
router.get('/:id/imatge', userCtrl.getImatge)
router.post('/login', auth.login)
router.post('/loginFB', auth.loginFB)
router.use(authCtrl.checkToken)
// Auth needed
router.post('/imatge/:id', userCtrl.afegirImatge)
router.delete('/deleteUser/:nom_user', userCtrl.deleteUser)
router.put('/updateUser/:id', userCtrl.updateUser)

module.exports = router
