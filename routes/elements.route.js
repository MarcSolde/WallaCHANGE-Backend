/**
 * Created by annamasc on 24/03/2017.
 */
var express = require('express');
var router = express.Router();
var elemCtrl = require('../controllers/element.controller');

/* Routes that can be accessed only by authenticated users*/
router.get('/api/elements', elemCtrl.getAllElements); //get all elements
router.get('/api/element/:id', elemCtrl.getOneElement); //get one element
router.post('/api/element/', elemCtrl.addElement); //create element

/* Routes that can be accessed only by authenticated & authorized users*/
router.put('/api/owner/element/:id', elemCtrl.updateElement); //update element
router.delete('/api/owner/element/:id', elemCtrl.deleteElement); //delete element
// User needs to be owner to modify or delete elements

module.exports = router;