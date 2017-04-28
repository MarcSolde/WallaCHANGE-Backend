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
    elementSvc.deleteElement(req, function (err) {
      if (err) return res.status(500).send(err.message)
      else res.status(200).send()
    })

}

exports.getOneElement = function (req, res) {
  var element = elementSvc.createElement(req)
  elementSvc.saveElement(element, function (err, nErr) {
    if (err) {
      console.log("no s'ha guardat l'element")
      res.status(500).send(err.message)
    } else res.status(200).json(element)
  })
}
/*
exports.getElementByTitol = function (req, res) {
  elementSvc.findElementByTitol(req.params.titol, function (err, elem) {
    if (err) {
      res.status(500).send(err.message)
    } else res.status(200).json(elem)
  })
}*/

exports.getElementById = function (req, res) {
  elementSvc.findElementById(req.params.id, function (err, elem) {
    if (err) {
      res.status(500).send(err.message)
    } else res.status(200).json(elem)
  })
}

exports.getAllElements = function (req, res) {
  var filter = {
    'titol': req.header('titol')
    //'localitat': req.header('localitat'),
    //'es_temporal': req.header('es_temporal')
  }
  elementSvc.findElementByTitolLocalitatPublicacio(filter, function (err, elem) {
    if (err) {
      res.status(500).send(err.message)
    } else res.status(200).json(elem)
  })
}

exports.updateElement = function (req, res) {
  elementSvc.updateElement(req, res)
}
