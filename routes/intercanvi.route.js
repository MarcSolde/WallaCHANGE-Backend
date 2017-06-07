var express = require('express')
var router = express.Router()
var intercanviCtrl = require('../controllers/intercanvi.controller')

router.get('/:id', intercanviCtrl.getIntercanvi)
router.get('/user/:user_id', intercanviCtrl.getAllIntercanvis)
router.post('/', intercanviCtrl.crearIntercanvi)
router.put('/:id', intercanviCtrl.modificarIntercanvi)
router.delete('/:id', intercanviCtrl.deleteIntercanvi)

module.exports = router