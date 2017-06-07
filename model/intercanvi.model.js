var mongoose = require('mongoose')

var intercanviSchema = new mongoose.Schema({
	id1: {
		type: String,
		required: true
	},
	id2: {
		type: String,
		required: true
	},
	idProd1: {
		type: String,
		required: true
	},
	idProd2: {
		type: String,
		required: true
	}
	idIntercanvi: {
		type: String,
	},
	acceptat: {
		type: Boolean,
		default: false
	},
	confirmat: {
		type: Boolean,
		default: false
	},
	temporal: {
		type: Boolean,
		default: false
	},
	dataInici: Date,
	dataFi: Date
})

module.exports = mongoose.model('intercanvi', intercanviSchema)
