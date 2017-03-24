/**
 * Created by annamasc on 24/03/2017.
 */
var mongoose = require('mongoose');
var element = mongoose.model('element');
'use strict'

exports.createElement = function (req) {
    //aqui posar valor a les coses

    return element;
}

exports.saveElement = function(element, res) {
    element.save(function (err, element) {
       if (err) return res.status(500).send(err.message);
       res.status(200).json(element); //have no idea of what I'm doing
    });
}

exports.deleteElement = function (req, res) {
    element.findOne({/*passar id element*/}, function(err, element) {
        element.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send(); //have no idea of what I'm doing
        })
    })
}

exports.updateElement = function (req, res) {
    //does something nice
}