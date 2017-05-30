var express = require('express')
var router = express.Router()
var intercanviCtrl = require('../contollers/intercanvi.contoller')

router.get('/intercanvi/:id', intercanviCtrl.getIntercanvi)
router.post('/intercanvi', intercanviCtrl.crearIntercanvi)
router.put('/intercanvi/:id', intercanviCtrl.modificarIntercanvi)
router.delete('/intercanvi', intercanviCtrl.eliminarIntercanvi)