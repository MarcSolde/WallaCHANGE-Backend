var mongoose = require('mongoose')
var intercanvi = mongoose.model('intercanvi')
'use strict'
const uuidV4 = require('uuid/v4')

exports.getIntercanvi = function (req, callback) {
	intercanvi.findOne({idIntercanvi: req.params.id}, function(err, intercanvi) {
		callback(err, intercanvi)
	})
}

exports.getAllIntercanvis = function (req, callback) {
	intercanvi.find({ $or: [{id1: {$eq: req.params.user_id}}, {id2: {$eq: req.params.user_id}}]},
		function(err, intercanvis) {
			callback(err, intercanvis)
		})
}

exports.crearIntercanvi = function (req, callback) {
	var intcanvi = new intercanvi({
		id1: req.body.id1,
		id2: req.body.id2,
		idProd1: req.body.idProd1,
		idProd2: req.body.idProd2,
		idIntercanvi: uuidV4(),
		acceptat: req.body.acceptat,
		confirmat: req.body.confirmat,
		temporal: req.body.temporal,
		dataInici: req.body.dataInici,
		dataFi: req.body.dataFi
	})
	callback(intcanvi)
}

exports.saveIntercanvi = function (intercanvi, callback) {
	intercanvi.save(function(err) {
		callback(err)
	})
}

exports.modificarIntercanvi = function (req, callback) {
	intercanvi.findOne({idIntercanvi: req.params.id}, function(err, intercanvi) {
		if (req.body.acceptat) intercanvi.acceptat = req.body.acceptat
		if (req.body.confirmat) intercanvi.confirmat = req.body.confirmat
		callback(intercanvi)
	})
}

exports.deleteIntercanvi = function (req, callback) {
	intercanvi.findOne({idIntercanvi: req.params.id}, function(err, intercanvi){
		intercanvi.remove({idIntercanvi: req.params.id}, function (err) {
			callback(err)
		})
	})
}