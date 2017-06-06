
var express = require('express')
var router = express.Router()
var chatCtrl = require('../controllers/chat.controller')

router.get('/conversations/:user_id', chatCtrl.getConversations)
router.get('/:conversation_id',  chatCtrl.getConversation)
router.post('/:conversation_id', chatCtrl.sendMessage)
router.post('/', chatCtrl.newConversation)
router.delete('/:conversation_id', chatCtrl.deleteConversation)


module.exports = router