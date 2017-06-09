/**
 * Created by annamasc on 24/03/2017.
 */

var elementSvc = require('../services/element.service')

exports.addElement = function (req, res) {
    elementSvc.createElement(req, function (element) {
      elementSvc.saveElement(element, function (err) {
          jsonReturn(res, err, element)
      })
    })
}

exports.deleteElement = function (req, res) {
    elementSvc.deleteElement(req, function (err) {
      jsonReturn(res, err, null)
    })
}

/*
exports.getElementByTitol = function (req, res) {
  elementSvc.findElementByTitol(req.params.titol, function (err, elem) {
    if (err) {
      res.status(500).send(err.message)
    } else res.status(200).json(elem)
  })
} */

exports.getElementById = function (req, res) {
    elementSvc.findElementById(req, function (err, element) {
        jsonReturn(res, err, element)
    })
}

exports.getAllElements = function (req, res) {
  var filter = {
    'titol': req.header('titol')
    // 'longitud': req.header(),
    // 'latitud': req.header() 
    // 'localitat': req.header('localitat'),
    // 'es_temporal': req.header('es_temporal')
  }
  elementSvc.findElementByTitolFiltre(filter, function (err, element) {
    jsonReturn(res, err, element)
  })
}

exports.getElementsByUserId = function (req, res) {
  elementSvc.findElementsByUserId(req, function(err, elements) {
    jsonReturn(res, err, elements)
  })
}

exports.getElementsByLocation = function (req, res) {
  elementSvc.findElementsByLocation(req, function(err, elements) {
    jsonReturn(res, err, elements)
  })
}

exports.updateElement = function (req, res) {
    elementSvc.updateElement(req, function (element) {
        elementSvc.saveElement(element, function (err) {
            jsonReturn(res, err, element)
        })
    })
}

exports.addComment = function (req, res) {
    elementSvc.addComment(req, function (err, element) {
        jsonReturn(res, err, element)
    })
}

exports.addImage = function (req, res) {
    elementSvc.addImage(req, res, function (err, element) {
        jsonReturn(res, err, element)
    })
}

exports.getImage = function (req, res) {
    elementSvc.getImage(req, function (err, pathPic) {
        if (err) res.status(500).send(err.message)
        else {
            res.status(200)
            res.sendFile(pathPic)
        }
    })
}

exports.deleteComment = function (req, res) {
    elementSvc.deleteComment(req, function (err) {
        jsonReturn(res, err, null)
    })
}

exports.deleteImage = function (req, res) {
    elementSvc.deleteImage(req, function (err) {
        jsonReturn(res, err, null)
    })
}

jsonReturn = function(res, err, object){
  if (err) res.status(500).send(err.message)
  else res.status(200).json(object)
}