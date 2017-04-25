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

exports.updateElement = function (req, callback) {
    element.findOne({_id: req.params._id}, function (err, element) {
        if (req.body.titol) element.titol = req.body.titol
        if (req.body.descripcio) element.descripcio = req.body.descripcio
        if (req.body.tipus_element) element.tipus_element = req.body.tipus_element
        if (req.body.es_temporal) element.es_temporal = req.body.es_temporal
        if (req.body.tags) element.tags = req.body.tags
        if (req.body.coordenades) element.coordenades = req.body.coordenades


        callback(element)
    })
}

exports.addComment = function (req, callback) {
    element.findOne({_id: req.params._id}, function (err, element) {
        var comentari = {text: req.body.comentaris['text'], nom_user: req.body.comentaris['nom_user']}
        element.comentaris.push(comentari)

        callback(element)
    })
}

exports.deleteComment = function (req, res) {
    element.findOne({_id: req.params._id}, function(err, element) {
        element.update(
            {},
            { $pull: {"comentaris": {"_id": req.body._id}}})
    })
}

exports.addImage = function (req, callback) {
    element.findOne({_id: req.params._id}, function (err, element) {
        for (var i in req.body.imatges) {
            var image = {path: req.body.imatges[i]}
            elem.imatges.push(image)

            callback(element)
        }
    })
}

exports.deleteImage = function (req, res) {
    element.findOne({_id: req.params._id}, function (err, element) {
        for (var i in req.body._id) {
            element.update(
                {},
                { $pull: {"imatges": {"_id": req.body._id[i]}}})
        }
    })

}