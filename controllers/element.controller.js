/**
 * Created by annamasc on 24/03/2017.
 */

/*var mongoose = require('mongoose');
var element = mongoose.model('element');
'use strict'*/

var elementSvc = require('../services/element.service');

exports.addElement = function (req, res) {
    elementSvc.saveElement(elementSvc.createElement(req), res);
    if (!stat) res.status(500).send(err.message);
    else res.status(200);
}

exports.getOneElement = function (req, res) {
    element.elementSvc.findElementByTitol (req, res);
    if (!stat) res.status(500).send(err.message);
    else res.status(200);
}

exports.getAllElements = function (req,res){
    
}

exports.deleteElement = function (req, res) {
    elementSvc.deleteElement(req, res);

}

exports.updateElement = function (req, res) {
    elementSvc.updateElement(req, res);
}

