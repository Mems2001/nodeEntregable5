const Conversations = require('../models/conversations.model');
const Participants = require('../models/participants.model');
const Messages = require('../models/messages.model');
const uuid = require('uuid');
const { findUserByPhone } = require('../users/users.controllers');
const Users = require('../models/users.model');

const createConversation = async(obj) => {
    const otherParticipant = await findUserByPhone(obj.participantPhone);

    const newConversation = await Conversations.create({
        id: uuid.v4() ,
        title: obj.title ,
        imageUrl: obj.imageUrl ,
        userId: obj.ownerId  // creator's conversation
    });
    const participant1 = await Participants.create({
        id: uuid.v4() ,
        userId: obj.ownerId , //obtained from req.user.id
        conversationId: newConversation.id   
    })
    const participant2 = await Participants.create({
        id: uuid.v4() ,
        userId: otherParticipant.id , //obtained from req.body
        conversationId: newConversation.id
    });

    return {
        newConversation ,
        participant1 ,
        participant2
    }
} ;

const findAllConversationsFromUser = async(id) => {
    return await Conversations.findAll({
        where: {
            userId : id ,
        } ,
        include: {
            model: Users
        } ,
        attributes: {
            exclude: [
                'userId'
            ]
        }
    })
};

const findConversationById = async(id) => {
    return await Conversations.findOne({
        where: {
            id
        }
    })
};

const editConversation = async(id , obj) => {
    const data = await Conversations.update({
        title: obj.title ,
        imageUrl: obj.imageUrl
    } , {
        where: {
            id
        }
    });

    return data[0]
};

const destroyConversation = async(id) => {
    return await Conversations.destroy({
        where: {
            id
        }
    })
};

const findAllMessagesFromConversation = async(id) => {
    return await Messages.findAll({
        where: {
            conversationId : id
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
} ;

module.exports = {
    createConversation ,
    findAllConversationsFromUser ,
    findConversationById ,
    editConversation ,
    destroyConversation ,
    findAllMessagesFromConversation ,
    createMessage
}