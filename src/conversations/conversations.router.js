const router = require('express').Router();
const passportJwt = require('../middleware/auth.middleware');

const conversationsServices = require('./conversations.services');

router.route('/')
    .post(passportJwt.authenticate('jwt' , {session:false}) , conversationsServices.postConversation)
    .get(passportJwt.authenticate('jwt' , {session:false}), conversationsServices.getAllConversationsFromUsers)

router.route('/:conversation_id')
    .get(passportJwt.authenticate('jwt' , {session:false}) , conversationsServices.getConversationById)
    .patch(passportJwt.authenticate('jwt' , {session:false}) , conversationsServices.patchConversation)
    .delete(passportJwt.authenticate('jwt' , {session:false}) , conversationsServices.deleteConversation)

router.route('/:conversation_id/messages')
    .get(passportJwt.authenticate('jwt' , {session:false}) , conversationsServices.getAllMessagesFromConversation)
    .post(passportJwt.authenticate('jwt' , {session:false}) , conversationsServices.postMessage)

module.exports = router