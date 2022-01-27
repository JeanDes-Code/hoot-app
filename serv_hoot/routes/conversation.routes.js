const router = require('express').Router();
const conversationController = require('../controllers/conversation.controller');

//new Conversation
router.post('/', conversationController.createConversation);
//get Conversation
router.get('/:userId', conversationController.readConversation);

module.exports = router;