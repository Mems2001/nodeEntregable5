const conversationsControllers = require('./conversations.controllers');

const postConversation = (req, res) => {
    const {imageUrl , participantPhone} = req.body;
    const ownerId = req.user.id;

    if (participantPhone) {
        conversationsControllers.createConversation({
            imageUrl , participantPhone , ownerId
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    } else {
        res.status(404).json({
            message: 'Missing data' ,
            fields: {
                participantPhone: '0999999999' ,
                imageUrl: 'picture link'
            }
        })
    }
};

const getAllConversationsFromUsers = (req, res) => {
    const id = req.user.id;

    conversationsControllers.findAllConversationsFromUser(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getConversationById = (req , res) => {
    const conversationId = req.params.conversation_id;
    const userId = req.user.id;

    conversationsControllers.findConversationById(conversationId , userId)
        .then(data => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({
                    message: 'Conversation not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const patchConversation = (req ,res) => {
    const {title , imageUrl} = req.body;
    const conversationId = req.params.conversation_id;
    const partId = req.user.id

    conversationsControllers.editConversation( conversationId , partId , {
        title , imageUrl 
    })
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Conversation succesfully updated' ,
                    data
                })
            } else {
                res.status(404).json({
                    message: 'Conversation not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const deleteConversation = (req , res) => {
    const conversationId = req.params.conversation_id;
    const partId = req.user.id

    conversationsControllers.destroyConversation(conversationId , partId)
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Conversation succesfully deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Invalid ID'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const postNewParticipant = (req , res) => {
    const conversationId = req.params.conversation_id;
    const {phone} = req.body;
    const userId = req.user.id;

    conversationsControllers.addParticipant({ userId , conversationId , phone })
        .then(data => {
            if (data && data !== 'notTheOwner') {
                res.status(201).json(data)
            } else if (data == 'notTheOwner') {
                res.status(400).json({
                    message: 'You are not the creator of the conversation'
                })
            } else {
                res.status(404).json({
                    message: 'Missing data'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getAllParticipantsFromConversation = (req, res) => {
    const userId = req.user.id ;
    const conversationId = req.params.conversation_id;
    
    conversationsControllers.findAllParticipantsFromConversation({
        userId , conversationId
    })
        .then(data => {
            if (data && data !== 'notParticipant') {
                res.status(200).json(data)
            } else if (data == 'notParticipant') {
                res.status(400).json({
                    message: 'You are not a participant of this conversation'
                })
            } else {
                res.status(404).json({
                    message: 'Conversation not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getPaticipantFromConversationById = (req , res) => {
    const userId = req.user.id ;
    const conversationId = req.params.conversation_id ;
    const participantId = req.params.participant_id;

    conversationsControllers.findParticipantFromConversationById(userId , conversationId , participantId)
        .then(data => {
            if (data && data !== 'notParticipant') {
                res.status(200).json(data)
            } else if (data !== 'notParticipant') {
                res.status(400).json({
                    message: 'You are not a participant of this conversation'
                })
            } else {
                res.status(404).json({
                    message: 'Conversation not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const deleteParticipant = (req , res) => {
    const userId = req.user.id ;
    const participantId = req.params.participant_id ;

    conversationsControllers.destroyParticipant(userId , participantId)
        .then(data => {
            if (data && data !== 'notTheOwner') {
                res.status(200).json({
                    message: 'Participant deleted'
                })
            } else if (data == 'notTheOwner') {
                res.status(400).json({
                    message: 'You are not the owner of this conversation'
                })
            } else {
                res.status(404).json({
                    message: 'Conversation not found'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

module.exports = {
    postConversation ,
    getAllConversationsFromUsers ,
    getConversationById ,
    patchConversation ,
    deleteConversation ,
    postConversation ,
    // Participants
    postNewParticipant ,
    getAllParticipantsFromConversation ,
    getPaticipantFromConversationById ,
    deleteParticipant
}