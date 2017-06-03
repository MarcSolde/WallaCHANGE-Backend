
mongoose = require('mongoose')

var conversationSchema = new mongoose.Schema({
	participants: [
		{
			type: String // uuid usuari
		}
	],
	id: String
}, {
	toObject: {
		transform: function (doc, ret) {
			delete ret._id
			delete ret.__v
		}
	},
	toJSON: {
		transform: function (doc, ret) {
			delete ret._id
			delete ret.__v
		}
	}
})

module.exports = mongoose.model('conversation', conversationSchema)
