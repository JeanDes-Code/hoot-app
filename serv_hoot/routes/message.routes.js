const router = require('express').Router();
const messageController = require('../controllers/message.controller');

//Create Message
router.post('/', messageController.createMessage )

//Get Message

router.get('/:conversationId', messageController.readMessage)


module.exports = router;