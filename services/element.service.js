/**
 * Created by annamasc on 24/03/2017.
 */
var mongoose = require('mongoose');
var element = mongoose.model('element');
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
        comentaris: undefined,
        coordenades: req.body.coordenades,
    })

    for (var i in req.body.imatges) {
        var image = {url: req.body.imatges[i], uid: 'some_uuid'}
        elem.imatges.push(image)
    }


    console.log(elem);

    return elem;
}

exports.saveElement = function(element, callback) {
    console.log(element);
    element.save(function (err, element) {
        callback(err, element);
    })
}

exports.deleteElement = function (req, res) {
    element.findOne({id_element: req.params.nom_user}, function(err, element) {
        element.remove(function (err) {
            if (err) return res.status(500).send(err.message)
            res.status(200).send()
        })
    })
}

exports.updateElement = function (req, res) {
    element.findOne({_id: req.params._id}, function (err, element) {
        if (req.body.titol) element.titol = req.body.titol
        if (req.body.descripcio) element.descripcio = req.body.descripcio
        if (req.body.tipus_element) element.tipus_element = req.body.tipus_element
        if (req.body.es_temporal) element.es_temporal = req.body.es_temporal
        if (req.body.tags) element.tags = req.body.tags
        if (req.body.coordenades) element.coordenades = req.body.coordenades


        element.save(function (err) {
            if (err) return res.status(500).send(err.message)
            res.status(200).jsonp(user)

        })
    })
}

exports.addComment = function (req, res) {
    element.findOne({_id: req.params._id}, function (err, element) {
        var comentari = {text: req.body.comentaris['text'], nom_user: req.body.comentaris['nom_user'], uid: 'some_uuid'}
        element.comentaris.push(comentari)
    })
}

exports.deleteComment = function (req, res) {

}

exports.addImage = function (req, res) {
    element.findOne({_id: req.params._id}, function (err, element) {
        for (var i in req.body.imatges) {
            var image = {data: req.body.imatges[i], uid: 'some_uid'}
            elem.imatges.push(image)
        }
    })
}

exports.deleteImage = function (req, res) {

}