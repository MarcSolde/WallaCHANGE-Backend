/**
 * Created by annamasc on 24/03/2017.
 */

var mongoose = require('mongoose');
var element = mongoose.model('element');
'use strict'

var elementSvc = require('../services/element.service');

exports.addElement = function (req, res) {
    elementSvc.saveElement(elementSvc.createElement(req), res);
}

exports.deleteElement = function (req, res) {
    elementSvc.deleteElement(req, res);
}

exports.updateElement = function (req, res) {
    elementSvc.updateElement(req, res);
}