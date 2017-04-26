/**
 * Created by annamasc on 24/03/2017.
 */
var express = require('express')
var router = express.Router()
var elemCtrl = require('../controllers/element.controller')

/* Routes that can be accessed only by authenticated users */
router.get('/elements', elemCtrl.getAllElements) // get all elements
router.get('/element/:titol', elemCtrl.getElementByTitol) // get elements with titol = :titol
router.post('/element/', elemCtrl.addElement) // create element

/* Routes that can be accessed only by authenticated & authorized users */
router.put('/owner/element/:id', elemCtrl.updateElement) //update element
router.put('/owner/element/:id/comment', elemCtrl.addComment) //add comment to element
router.put('/owner/element/:id/image', elemCtrl.addImage) //add images to element
router.put('/owner/element/:id/delete/comment', elemCtrl.deleteComment) //delete comment
router.put('/owner/element/:id/delete/image', elemCtrl.deleteImage) //delete images
router.delete('/owner/element/:id', elemCtrl.deleteElement) // delete element
// User needs to be owner to modify or delete elements

module.exports = router
