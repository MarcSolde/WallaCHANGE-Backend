

'use strict'

var mongoose = require('mongoose')
var conversation = mongoose.model('conversation')
var message = mongoose.model('message')
var mongo = require('mongodb')
const uuid = require('uuid/v4')

exports.newConversation = function (req, callback) {
	var conv = new conversation({
		participants: [req.query.from, req.query.to],
		id: uuid()
	})
	conv.save(function (err, conv) {
		var msg = new message({
			conversation_id: conv.id,
			body: req.body.message,
			author: req.query.from
		})
		console.log(conv)
		msg.save(function (err, msg) {
			callback(err, msg.conversation_id)
		})
	}
		/*if (err) callback(err, null)
		var msg = new message({
			conversation_id: newConversation.id,
			body: req.body.message,
			author: req.query.from
		})
		msg.save((err, newMessage) => {
			callback(err, newConversation.id)
		})*/
	)
}

exports.getConversation = function (req, callback) {
	message.find({conversation_id: req.params.conversation_id})
	.select('createdAt body author')
	.sort('-createdAt')
	.exec((err, messages) => {
		callback(err, messages)
	})
}

exports.addMessage = function (req, callback) {
	var msg = new message({
		conversation_id: req.params.conversation_id,
		body: req.body.message,
		author: req.body.author
	})
	msg.save((err, newMessage) => {
		callback(err)
	})
}

exports.getConversations = function (req, callback) {
	console.log(req.params.user_id)
	conversation.find({participants: req.params.user_id})
	.select('_id')
	.exec((err, convs) => {
		if (!err) {
			const fullConversations = []
			convs.forEach((conv) => {
				console.log("hello: "+conv.id)
				message.find({conversation_id: conv.id})
				.sort('-createdAt')
				.limit(1)
				.exec((err, message) => {
					fullConversations.push(message)
					if (fullConversations.length === convs.length) {
						console.log(fullConversations)
						callback(err, fullConversations)
					}
				})
			})
		} else callback(err, null)
	})
}

exports.deleteConversation = function (req, callback) {
	message.remove({conversation_id: req.params.conversation_id})
	conversation.remove({id: req.params.conversation_id}, function (err) {
		callback(err)
	})
}