
mongoose = require('mongoose')

var messageSchema = new mongoose.Schema({
	conversation_id: {
		type: String, //uuid conversation
		required: true
	},
	body: {
		type: String,
		required: true
	},
	author: {
		type: String // user uuid
		//required: true
	}
}, {
	timestamps: true
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

module.exports = mongoose.model('message', messageSchema)
