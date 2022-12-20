const uuid = require('uuid');
const Messages = require('../models/messages.model');
const { findParticipantByUserIdAndConversationId } = require('../participants/participants.controllers');

const findAllMessagesFromConversation = async(conversationId , partId) => {
    try {
        const a = await findParticipantByUserIdAndConversationId(partId , conversationId)
        console.log(a)
        if (a) {
            const data = await Messages.findAll({
                where: {
                    conversationId
                }
            })
            
            return data
        } else {
            return null
        }

    } catch (error) {
        return null
    }
};

const createMessage = async(obj , userId) => {
    try {
        const a = await findParticipantByUserIdAndConversationId(userId , obj.conversationId)
        console.log(a)
        if (a) {
            const data = await Messages.create({
                id: uuid.v4() ,
                message: obj.message ,
                userId: obj.userId ,
                conversationId: obj.conversationId
            });
            
            return data
        } else {
            return null
        }
    } catch (error) {
        return null
    }

};

const findOneMessage = async(messageId , conversationId) => {
    return await Messages.findOne({
        where: {
            id : messageId ,
            conversationId
        }
    })
};

// Only the sender of the message can delete it
const destroyMessage = async(messageId , conversationId , userId) => {
    return await Messages.destroy({
        where: {
            id: messageId ,
            conversationId ,
            userId
        }
    })
};

// console.log(findAllMessagesFromConversation('d7a57e88-6e02-4041-a0c2-0bf1d2cc1310'))

module.exports = {
    findAllMessagesFromConversation ,
    createMessage ,
    findOneMessage ,
    destroyMessage
}