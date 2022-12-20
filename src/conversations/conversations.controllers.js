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

// This controller will operate in participants model because it needs to get conversations in which the user is a participant, 
//not only conversations in which the user is the creator
const findAllConversationsFromUser = async(id) => {  
    return await Participants.findAll({
        where: {
            userId : id ,
        } ,
        include: {
            model: Conversations
        } ,
        attributes: {
            exclude: [
                'id' ,
                'createdAt' ,
                'updatedAt' ,
                'conversationId' ,
                'userId'
            ]
        }
    })
};

// This controller will operate in Participants model because other way only the creator will be able to find 
// the conversation by id and not the other participants
const findConversationById = async(conversationId , userId) => {
    return await Participants.findOne({
        where: {
            conversationId ,
            userId
        } ,
        include: {
            model: Conversations
        } ,
        attributes: {
            exclude: [
                'id' ,
                'createdAt' ,
                'updatedAt' ,
                'conversationId' ,
                'userId'
            ]
        }
    })
};

const editConversation = async(id , obj) => {
    const data = await Conversations.update({
        title: obj.title ,
        imageUrl: obj.imageUrl
    } , {
        where: {
            id ,
            userId: obj.userId
        }
    });

    return data[0]
};

const destroyConversation = async(id , userId) => {
    return await Conversations.destroy({
        where: {
            id ,
            userId
        }
    })
};

module.exports = {
    createConversation ,
    findAllConversationsFromUser ,
    findConversationById ,
    editConversation ,
    destroyConversation
}