var express = require('express')
var router = express.Router()
var intercanviCtrl = require('../contollers/intercanvi.contoller')

router.get('/:id', intercanviCtrl.getIntercanvi)
router.post('/', intercanviCtrl.crearIntercanvi)
router.put('/:id', intercanviCtrl.modificarIntercanvi)
router.delete('/:id', intercanviCtrl.eliminarIntercanvi)