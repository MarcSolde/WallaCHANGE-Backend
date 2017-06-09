

'use strict'

var mongoose = require('mongoose')
var message = mongoose.model('message')
var mongo = require('mongodb')
const uuid = require('uuid/v4')

/*exports.newConversation = function (req, callback) {
	var conv = new conversation({
		participants: req.body.participants, // aqui potser he de fer un for
		id: uuid()
	})
	conv.save(function (err, conv) {
		var msg = new message({
			idIntercanvi: conv.id,
			body: req.body.message,
			author: req.query.from
		})
		//console.log(conv)
		msg.save(function (err, msg) {
			callback(err, msg.idIntercanvi)
		})
	})
}*/

exports.getChat = function (req, callback) {
	message.find({idIntercanvi: req.params.idIntercanvi})
	.select('createdAt body author')
	.sort('-createdAt')
	.exec((err, messages) => {
		callback(err, messages)
	})
}

exports.addMessage = function (req, callback) {
	var msg = new message({
		idIntercanvi: req.params.idIntercanvi,
		body: req.body.message,
		author: req.body.author
	})
	msg.save((err, newMessage) => {
		callback(err)
	})
}

/*exports.getConversations = function (req, callback) {
	conversation.find({participants: req.params.user_id})
	.select('_id')
	.exec((err, convs) => {
		if (!err) {
			const fullConversations = []
			convs.forEach((conv) => {
				//console.log("hello: "+conv.id)
				message.find({idIntercanvi: conv.id})
				.sort('-createdAt')
				.limit(1)
				.exec((err, message) => {
					item = {conversation: conv, message: message}
					//console.log(item)
					fullConversations.push(item)
					if (fullConversations.length === convs.length) {
						//console.log(fullConversations)
						callback(err, fullConversations)
					}
				})
			})
		} else callback(err, null)
	})
}*/

exports.deleteChat = function (req, callback) {
	message.remove({idIntercanvi: req.params.idIntercanvi}, function (err) {
		callback(err)
	})
}