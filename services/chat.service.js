

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
			conversationId: conv.id,
			body: req.body.message,
			author: req.query.from
		})
		msg.save(function (err, conv) {
			callback(err, conv.id)
		})
	}
		/*if (err) callback(err, null)
		var msg = new message({
			conversationId: newConversation.id,
			body: req.body.message,
			author: req.query.from
		})
		msg.save((err, newMessage) => {
			callback(err, newConversation.id)
		})*/
	)
}

exports.getConversation = function (req, callback) {
	message.find({conversationId: req.params.conversationId})
	.select('createdAt body author')
	.sort('-createdAt')
	.exec((err, messages) => {
		callback(err, messages)
	})
}

exports.addMessage = function (req, callback) {
	var msg = new message({
		conversationId: req.params.conversationId,
		body: req.body.message,
		author: req.body.author
	})
	msg.save((err, newMessage) => {
		callback(err)
	})
}

exports.getConversations = function (req, callback) {
	conversation.find({participants: req.params.userId})
	.select('_id')
	.exec((err, convs) => {
		if (!err) {
			const fullConversations = []
			convs.forEach((conv) => {
				console.log("hello")
				message.find({conversationId: conv.id})
				.sort('-createdAt')
				.limit(1)
				.exec((err, message) => {
					fullConversations.push(message)
					if (fullConversations.length === conversations.length) {
						callback(err, fullConversations)
					}
				})
			})
		} else callback(err, null)
	})
}