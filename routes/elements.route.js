/**
 * Created by annamasc on 24/03/2017.
 */
var express = require('express')
var router = express.Router()
var elemCtrl = require('../controllers/element.controller')

/* Routes that can be accessed only by authenticated users */
router.get('/element', elemCtrl.getAllElements) // get all elements
router.get('/element/:id', elemCtrl.getElementById) // get element with id = :id
router.get('/element/user/:user_id', elemCtrl.getElementsByUserId) // get elements of a user
router.get('/location/element', elemCtrl.getElementsByLocation) // get elements by location
router.get('/element/:id/image/:i_id', elemCtrl.getImage) //get element image
//router.get('/element/:titol', elemCtrl.getElementByTitol) // get elements with titol = :titol
router.post('/element', elemCtrl.addElement) // create element

/* Routes that can be accessed only by authenticated & authorized users */
//THIS ^ NEEDS TO BE IMPLEMENTED!!!
router.put('/element/:id', elemCtrl.updateElement) //update element
router.put('/element/:id/comment', elemCtrl.addComment) //add comment to element
router.post('/element/:id/image', elemCtrl.addImage) //add images to element
router.delete('/element/:id/comment/:c_id', elemCtrl.deleteComment) //delete comment
router.delete('/element/:id/image/:i_id', elemCtrl.deleteImage) //delete images
router.delete('/element/:id', elemCtrl.deleteElement) // delete element
// User needs to be owner to modify or delete elements

module.exports = router
