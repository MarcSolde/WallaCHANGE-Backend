/**
 * Created by annamasc on 24/03/2017.
 */
var mongoose = require('mongoose')
var element = mongoose.model('element')
'use strict'

exports.createElement = function (req) {
    var elem = new element({
        titol: req.body.titol,
        descripcio: req.body.descripcio,
        imatges: [],
        nom_user: req.body.nom_user,
        data_publicacio: req.body.data_publicacio,
        tipus_element: req.body.tipus_element,
        es_temporal: req.body.es_temporal,
        tags: req.body.tags,
        comentaris: [],
        coordenades: req.body.coordenades,
    })

    for (var i in req.body.imatges) {
        var image = {path: req.body.imatges[i]}
        elem.imatges.push(image)
    }

    return elem
}

exports.saveElement = function(element, callback) {
    element.save(function (err, element) {
        callback(err, element)
    })
}

exports.deleteElement = function (req, res) {
    element.findOne({_id: req.params._id}, function(err, element) {
        element.remove(function (err) {
            if (err) return res.status(500).send(err.message)
            res.status(200).send()
        })
    })
}

