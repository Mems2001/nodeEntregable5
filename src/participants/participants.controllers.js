const Participants = require('../models/participants.model');
const uuid = require('uuid');

const createParticipant = async(obj) => {
    return await Participants.create({
        id: uuid.v4() ,
        userId: obj.userId ,
        conversationId: obj.conversationId
    })
};

const findParticipantByUserIdAndConversationId = async(userId , conversationId) => {
    const data = await Participants.findOne({
        where: {
            userId ,
            conversationId
        }
    })
    return data
};

// const findAllParticipantsFromConversation = async(partId , conversationId) => {
//     try {
//         const participant = await Participants.findOne({
//             where: {
//                 userId: partId ,
//                 conversationId
//             }
//         })
//         console.log(participant || 'no hay')

//         if (participant) {
//             const data = await Participants.findAll({
//                 where: {
//                     conversationId
//                 }
//             })

//             return data
//         } else {
//             return 'notAParticipant'
//         }
//     } catch (error) {
//         return null
//     }
// };

module.exports = {
    createParticipant ,
    findParticipantByUserIdAndConversationId 
    // findAllParticipantsFromConversation
}