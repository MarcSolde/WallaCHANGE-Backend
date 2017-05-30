var mongoose = require('mongoose')
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
		idProd: req.body.idProd,
		idIntercanvi: req.body.idIntercanvi,
		//TODO: Implementar xat
		//idXat: blabla
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
		//TODO
		if (req.body.acceptat) intercanvi.acceptat = req.body.acceptat
		if (req.body.confirmat) intercanvi.confirmat = req.body.confirmat
	})
}