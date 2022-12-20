const participantsControllers = require('./participants.controllers');

// const getAllParticipantsFromConversation = (req, res) => {
//     const partId = req.user.id ;
//     const conversationId = req.params.conversation_id ;

//     participantsControllers.findAllParticipantsFromConversation(partId , conversationId)
//         .then(data => {
//             if (data && data !== 'notAParticipant') {
//                 res.status(200).json(data)
//             } else if (data == 'notAParticipant') {
//                 res.status(400).json({
//                     message: 'You are not a participant of this conversation'
//                 })
//             } else {
//                 res.status(404).json({
//                     message: 'Conversation not found'
//                 })
//             }
//         })
//         .catch(err => {
//             res.status(400).json({
//                 message: err.message
//             })
//         })
// };

module.exports = {
    // getAllParticipantsFromConversation
}