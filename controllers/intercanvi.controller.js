var intercanviSvc = require('../services/intercanvi.service')

exports.getIntercanvi = function(req, res) {
	intercanviSvc.getIntercanvi(req, function(err, intercanvi){
		jsonReturn(res, err, intercanvi)
	})
}

exports.getAllIntercanvis = function (req, res) {
	intercanviSvc.getAllIntercanvis(req, function(err, intercanvis) {
		jsonReturn(res, err, intercanvis)
	})
}

exports.crearIntercanvi = function(req, res) {
	var intercanvi = intercanviSvc.crearIntercanvi(req, function(intercanvi) {
		intercanviSvc.saveIntercanvi(intercanvi, function(err) {
			jsonReturn(res, err, intercanvi)
		})
	})
	
}

exports.modificarIntercanvi = function(req, res) {
	intercanviSvc.modificarIntercanvi(req, function(intercanvi){
		intercanviSvc.saveIntercanvi(intercanvi, function(err){
			jsonReturn(res, err, intercanvi)
		})
	})
}

exports.deleteIntercanvi = function (req, res) {
	intercanviSvc.deleteIntercanvi(req, function(err) {
		jsonReturn(res, err, null)
	})
}

jsonReturn = function(res, err, object){
  if (err) res.status(500).send(err.message)
  else res.status(200).json(object)
}
