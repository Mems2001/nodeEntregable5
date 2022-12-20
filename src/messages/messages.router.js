const messagesServices = require('./messages.services');
const passportJWT = require('../middleware/auth.middleware');

const router = require('express').Router();

router.route('/:conversation_id/messages')
    .get(passportJWT.authenticate('jwt' , {session:false}) , messagesServices.getAllMessagesFromConversations)
    .post(passportJWT.authenticate('jwt' , {session:false}) , messagesServices.postMessage)

router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt' , {session:false}) , messagesServices.getOneMessage)
    .delete(passportJWT.authenticate('jwt' , {session:false}) , messagesServices.deleteMessage)

module.exports = router