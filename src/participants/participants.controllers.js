const Participants = require('../models/participants.model');
const uuid = require('uuid');

const findParticipantByUserIdAndConversationId = async(userId , conversationId) => {
    const data = await Participants.findOne({
        where: {
            userId ,
            conversationId
        }
    });

    return data
};

const createParticipant = async(obj) => {
    const data = await Participants.create({
        id: uuid.v4() ,
        userId: obj.userId ,
        conversationId: obj.conversationId
    })

    return data
};

module.exports = {
    findParticipantByUserIdAndConversationId ,
    createParticipant
}