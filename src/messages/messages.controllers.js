const uuid = require('uuid');
const Messages = require('../models/messages.model');

const findAllMessagesFromConversation = async(id) => {
    return await Messages.findAll({
        where: {
            conversationId: id
        }
    })
};

const createMessage = async(obj) => {
    const data = await Messages.create({
        id: uuid.v4() ,
        message: obj.message ,
        userId: obj.userId ,
        conversationId: obj.conversationId
    });
    
    return data
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