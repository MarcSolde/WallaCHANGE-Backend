/**
 * Created by annamasc on 24/03/2017.
 */

var elementSvc = require('../services/element.service')

filterResult = function (element) {
  /*for (i in element.imatges) {
    console.log(i)
    delete i._id
    delete i.path
  }
  for (i in element.comentaris) {
    delete i._id
  }*/
  return element
}

exports.addElement = function (req, res) {
    elementSvc.createElement(req, function (element) {
      elementSvc.saveElement(element, function (err) {
          if (err) res.status(500).send(err.message)
          else {
            res.status(200).json(element)
          }
      })
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
    } else {
      filterResult(element)
      res.status(200).json(element)
    }
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
        if (err) res.status(500).send(err.message)
        else {
          element.toJSON()
          res.status(200).json(element)
        }
    })
}

exports.getAllElements = function (req, res) {
  var tags = req.header('tags').split(',')
  console.log(tags)
  var filter = {
    'titol': req.header('titol')
    // 'tags': array
    // 'longitud': req.header(),
    // 'latitud': req.header() 
    // 'localitat': req.header('localitat'),
    // 'es_temporal': req.header('es_temporal')
  }
  elementSvc.findElementByTitolFiltre(filter, function (err, elem) {
    if (err) {
      res.status(500).send(err.message)
    } else res.status(200).json(elem)
  })
}

exports.getElementsByUserId = function (req, res) {
  elementSvc.findElementsByUserId(req, function(err, elements) {
    if (err) res.status(500).send(err.message)
    else {
      for (e in elements) filterResult(e)
      res.status(200).json(elements)
    }
  })
}

exports.getElementsByLocation = function (req, res) {
  elementSvc.findElementsByLocation(req, function(err, elements) {
    if (err) res.status(500).send(err.message)
    else {
      res.status(200).json(elements)
    }
  })
}

exports.updateElement = function (req, res) {
    elementSvc.updateElement(req, function (element) {
        elementSvc.saveElement(element, function (err) {
            if (err) res.status(500).send(err.message)
            else {
              filterResult(element)
              res.status(200).json(element)
            }
        })
    })
}

exports.addComment = function (req, res) {
    elementSvc.addComment(req, function (err, element) {
        if (err) res.status(500).send(err.message)
        else {
          filterResult(element)
          res.status(200).json(element)
        }
    })
}

exports.addImage = function (req, res) {
    elementSvc.addImage(req, res, function (err, element) {
        if (err) res.status(500).send(err.message)
        else {
          res.status(200).json(element)
        }
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
        else res.status(200).send()
    })
}

exports.deleteImage = function (req, res) {
    elementSvc.deleteImage(req, function (err) {
        if (err) res.status(500).send(err.message)
        else res.status(200).send()
    })
}

exports.getAllTags = function (req, res) {
  console.log("hey que paxe tagones")
  elementSvc.getTags (function(err, llistaTags) {
    llistaReturn(res, err, llistaTags)
  })
}