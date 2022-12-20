const router = require('express').Router();
const passportJWT = require('../middleware/auth.middleware');
const participantsServices = require('./participants.services');

// router.route('/:conversations_id/participants')
//     .get(passportJWT.authenticate('jwt' , {session:false}) , participantsServices.getAllParticipantsFromConversation)

module.exports = router