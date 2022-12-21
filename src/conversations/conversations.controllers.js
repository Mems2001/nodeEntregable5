const Conversations = require('../models/conversations.model');
const Participants = require('../models/participants.model');
const Users = require('../models/users.model');
const uuid = require('uuid');
const { findUserByPhone, findUserById } = require('../users/users.controllers');
const { findParticipantByUserIdAndConversationId } = require('../participants/participants.controllers');

const createConversation = async(obj) => {
    const otherParticipant = await findUserByPhone(obj.participantPhone);
    const creator = await findUserById(obj.ownerId);

    const newConversation = await Conversations.create({
        id: uuid.v4() ,
        title: `${creator.firstname} - ${otherParticipant.firstname}` ,
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
            model: Conversations ,
            include: {
                model: Participants ,
                attributes: {
                    exclude: [
                        'userId' ,
                        'conversationId' ,
                        'createdAt' ,
                        'updatedAt'
                    ]
                } ,
                include: {
                    model: Users ,
                    attributes: {
                        exclude: [
                            'password' ,
                            'status' ,
                            'isVerified' ,
                            'createdAt' ,
                            'updatedAt' ,
                            'profileImage'
                        ]
                    }
                }
            }
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

const editConversation = async(conversationId , partId , obj) => {

    try {
        const participant = await findParticipantByUserIdAndConversationId(partId , conversationId)
        // console.log(participant)

        if (participant) {
            const data = await Conversations.update({
                title: obj.title ,
                imageUrl: obj.imageUrl
            } , {
                where: {
                    id: conversationId
                }
            });
    
            return data[0]
        }

        return null
 
    } catch (error) {
        return null
    }
};

const destroyConversation = async(conversationId , partId) => {
    
    try {
        await findParticipantByUserIdAndConversationId(partId , conversationId)

        const data = await Conversations.destroy({
            where: {
                id: conversationId
            }
        })

        return data
    } catch (error) {
        return null
    }
};

const findConversationByCreatorId = async(creatorId) => {
    return await Conversations.findOne({
        where: {
            userId: creatorId
        }
    })
};

const addParticipant = async(obj) => {
    try {
        const owner = await findConversationByCreatorId(obj.userId)
        // console.log(owner)
        if (owner) {
            const data = await Participants.create({
                id: uuid.v4() ,
                userId: obj.userId ,
                conversationId: obj.conversationId
            })

            return data
        } else {
            return 'notTheOwner'
        }
    } catch (error) {
        return null
    }
};

const findAllParticipantsFromConversation = async(obj) => {
    try {
        const participant = await findParticipantByUserIdAndConversationId(obj.userId , obj.conversationId)
        // console.log(participant)
        if (participant) {
            const data = await Participants.findAll({
                where: {
                    conversationId: obj.conversationId
                } ,
                include: {
                    model: Users ,
                    attributes: {
                        exclude: [
                            'password' ,
                            'createdAt' ,
                            'updatedAt' ,
                            'status' ,
                            'isVerified'
                        ]
                    }
                } ,
                attributes: {
                    exclude: [
                        'userId'
                    ]
                }
            })
            return data
        } else {
            return 'notParticipant'
        }
    } catch (error) {
        return null
    }
};

const findParticipantFromConversationById = async(userId , conversationId , participantId) => {
    try {
        const participant = await findParticipantByUserIdAndConversationId(userId , conversationId)
        // console.log(participant)
        if (participant) {
            const data = await Participants.findOne({
                where: {
                    id: participantId ,
                    conversationId
                } ,
                include: {
                    model: Users ,
                    attributes: {
                        exclude: [
                            'password' ,
                            'createdAt' ,
                            'updatedAt',
                            'status' ,
                            'isVerified'
                        ]
                    } 
                } ,
                attributes: {
                    exclude: [
                        'userId'
                    ]
                }
            });
            return data
        } else {
            return 'notParticipant'
        }
    } catch (error) {
        return null
    }
};

// Only the creator/owner of the conversation will be able to delete a participant
const destroyParticipant = async(userId , participantId) => {
    try {
        const owner = await findConversationByCreatorId(userId);
        if (owner) {
            const data = await Participants.destroy({
                where: {
                    id: participantId
                }
            })
            return data
        } else {
            return 'notTheOwner'
        }
    } catch (error) {
        return null
    }
};

// Controller for 3 participants or more

module.exports = {
    createConversation ,
    findAllConversationsFromUser ,
    findConversationById ,
    editConversation ,
    destroyConversation ,
    findConversationByCreatorId ,
    // Participants
    addParticipant ,
    findAllParticipantsFromConversation ,
    findParticipantByUserIdAndConversationId ,
    findParticipantFromConversationById ,
    destroyParticipant
}