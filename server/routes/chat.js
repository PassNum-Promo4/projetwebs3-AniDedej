const ChatController = require('../controllers/chat.controller');
const express = require('express');
const router = express.Router();

router.get('/', ChatController.getAllConversations);

router.get('/messages', ChatController.getMessages);

router.get('/:username', ChatController.getConversations);

router.get('/messages/:conversationId', ChatController.getMessagesOfConversation);

// Retrieve single conversation
//router.get('/:conversationId', ChatController.getConversation);

// Send reply in conversation
router.post('/:conversationId', ChatController.sendReply);

// Start new conversation
router.post('/new/:username', ChatController.newConversation);

module.exports = router;