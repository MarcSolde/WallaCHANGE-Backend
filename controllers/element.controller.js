/**
 * Created by annamasc on 24/03/2017.
 */

/*var mongoose = require('mongoose')
var element = mongoose.model('element')
'use strict'*/

var elementSvc = require('../services/element.service')

exports.addElement = function (req, res) {
    var element = elementSvc.createElement(req)
    var stat = elementSvc.saveElement(element, function (err, nErr) {
        if (err) {
            res.status(500).send(err.message)
        }
        else res.status(200).json(element)
    })
}

exports.deleteElement = function (req, res) {
    elementSvc.deleteElement(req, res)

}

exports.getOneElement = function (req, res) {

}

exports.getAllElements = function (req, res) {

}

exports.updateElement = function (req, res) {
    elementSvc.updateElement(req, function (element) {
        console.log(element)
        elementSvc.saveElement(element, function (err) {
            if (err) res.status(500).send(err.message)
            else res.status(200).json(element)
        })
    })
}

exports.addComment = function (req, res) {
    elementSvc.addComment(req, function (element) {
        console.log(element)
        elementSvc.saveElement(element, function (err) {
            if (err) res.status(500).send(err.message)
            else res.status(200).json(element)
        })
    })
}

exports.addImage = function (req, res) {
    elementSvc.addImage(req, function (element) {
        console.log(element)
        elementSvc.saveElement(element, function (err) {
            if (err) res.status(500).send(err.message)
            else res.status(200).json(element)
        })
    })
}

exports.deleteComment = function (req, res) {
    elementSvc.deleteComment(req, res)
}

exports.deleteImage = function (req, res) {
    elementSvc.deleteImage(req, res)
}