const express = require('express');
const AuthController = require('../Controllers/AuthorizationController');
const ChatController=require('../Controllers/CharController')

const ChatRouter = express.Router({ mergeParams: true });

ChatRouter.get('ws/chats/:reciever_id', AuthController.protect, ChatController.handleSocketConnection);
ChatRouter.get('/myChats', AuthController.protect, ChatController.getMessagesByid);
ChatRouter.post('/sendMessage', AuthController.protect, ChatController.sendMessage);

module.exports = ChatRouter;
