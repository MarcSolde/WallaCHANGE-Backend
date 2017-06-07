var mongoose = require('mongoose')
var chatCtrl = require('../controllers/chat.controller.js')
var intercanvi = mongoose.model('intercanvi')
'use strict'

exports.getIntercanvi = function (req, callback) {
	intercanvi.findOne({idIntercanvi: req.params.id}, function(err, intercanvi) {
		callback(err, intercanvi)
	})
}

exports.crearIntercanvi = function (req, callback) {
	var intercanvi = new intercanvi({
		id1: req.body.id1,
		id2: req.body.id2,
		idProd1: req.body.idProd1,
		idProd2: req.body.idProd2,
		idIntercanvi: uuidV4(),
		//TODO: Implementar xat
		acceptat: req.body.acceptat,
		confirmat: req.body.confirmat,
		temporal: req.body.temporal,
		dataInici: req.body.dataInici,
		dataFi: req.body.dataFi
	})
	callback(intercanvi)
}

exports.saveIntercanvi = function (req, callback) {
	intercanvi.save(function(err, intercanvi) {
		callback(err)
	})
}

exports.modificarIntercanvi = function (req, callback) {
	intercanvi.findOne({idIntercanvi: req.params.id}, function(err, intercanvi) {
		//TODO:tema del xat
		if (req.body.acceptat) intercanvi.acceptat = req.body.acceptat
		if (req.body.confirmat) intercanvi.confirmat = req.body.confirmat
	})
}

exports.deleteIntercanvi = function (req, callback) {
	intercanvi.findOne({idIntercanvi: req.params.id}, function(err, intercanvi){
		intercanvi.remove({idIntercanvi: req.params.id}, function (err) {
			callback(err)
		})
	})
}