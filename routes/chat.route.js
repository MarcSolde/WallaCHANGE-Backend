
var express = require('express')
var router = express.Router()
var chatCtrl = require('../controllers/chat.controller')

router.get('/conversations/:userId', chatCtrl.getConversations)
router.get('/:conversationId',  chatCtrl.getConversation)
router.post('/:conversationId', chatCtrl.sendMessage)
router.post('/', chatCtrl.newConversation)


module.exports = router