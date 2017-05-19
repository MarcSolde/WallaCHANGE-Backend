/**
 * Created by annamasc on 24/03/2017.
 */

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
    elementSvc.findElementById(req, function (err, element) {
        if (err) res.status(500).send(err.message)
        else res.status(200).json(element)
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

exports.getElementsByNomUser = function (req, res) {
  elementSvc.findElementsByNomUser(req, function(err, elements) {
    if (err) res.status(500).send(err.message)
    else res.status(200).json(elements)
  })
}

exports.updateElement = function (req, res) {
    elementSvc.updateElement(req, function (element) {
        elementSvc.saveElement(element, function (err) {
            if (err) res.status(500).send(err.message)
            else res.status(200).json(element)
        })
    })
}

exports.addComment = function (req, res) {
    elementSvc.addComment(req, function (err, element) {
        if (err) res.status(500).send(err.message)
        else res.status(200).json(element)
    })
}

exports.addImage = function (req, res) {
    elementSvc.addImage(req, res, function (err, element) {
        if (err) res.status(500).send(err.message)
        else res.status(200).json(element)
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
        if (err) res.status(500).send(err.message)
        else res.status(200).send("Comentari esborrat.")
    })
}

exports.deleteImage = function (req, res) {
    elementSvc.deleteImage(req, function (err) {
        if (err) res.status(500).send(err.message)
        else res.status(200).send("Imatge esborrada.")
    })
}