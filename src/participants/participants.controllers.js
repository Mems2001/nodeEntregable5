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
    return await Participants.findOne({
        where: {
            userId ,
            conversationId
        }
    })
};

module.exports = {
    createParticipant ,
    findParticipantByUserIdAndConversationId
}