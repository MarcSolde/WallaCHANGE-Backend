
var chatSvc = require('../services/chat.service')


exports.getConversations = function (req, res) {
	chatSvc.getConversations(req, function (err, conversations) {
      if (err) return res.status(500).send(err.message)
      else res.status(200).json({conversations: conversations})
    })
}

exports.getConversation = function (req, res) {
	chatSvc.getConversation (req, function (err, messages) {
		if (err) res.status(500).send(err.message)
		else res.status(200).json(messages)
	})
}

exports.newConversation = function (req, res) {
	chatSvc.newConversation (req, function (err, convId) {
		if (err) res.status(500).send(err.message)
		else res.status(200).json({ conversation_id: convId })
	})
}

exports.sendMessage = function (req, res) {
	chatSvc.addMessage (req, function (err) {
		if (err) res.status(500).send(err.message)
		else res.status(200).send()
	})
}

exports.deleteConversation = function (req, res) {
	chatSvc.deleteConversation (req, function (err) {
		if (err) res.status(500).send(err.message)
		else res.status(200).send()
	})
}