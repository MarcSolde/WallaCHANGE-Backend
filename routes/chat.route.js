
var express = require('express')
var router = express.Router()
var chatCtrl = require('../controllers/chat.controller')

//router.get('/conversations/:user_id', chatCtrl.getConversations)
router.get('/:idIntercanvi',  chatCtrl.getChat)
router.post('/:idIntercanvi', chatCtrl.sendMessage)
//router.post('/', chatCtrl.newConversation)
router.delete('/:idIntercanvi', chatCtrl.deleteChat)


module.exports = router