const conversationsControllers = require('./conversations.controllers');

const postConversation = (req, res) => {
    const {title , imageUrl , participantPhone} = req.body;
    const ownerId = req.user.id;

    if (participantPhone) {
        conversationsControllers.createConversation({
            title, imageUrl , participantPhone , ownerId
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

const patchConversation = (req ,res) => {
    const {title , imageUrl} = req.body;
    const id = req.params.conversation_id;
    const userId = req.user.id

    conversationsControllers.editConversation( id , {
        title , imageUrl , userId
    })
        .then(data => {
            res.status(200).json({
                message: 'Conversation succesfully updated' ,
                data
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const deleteConversation = (req , res) => {
    const id = req.params.conversation_id;
    const userId = req.user.id

    conversationsControllers.destroyConversation(id , userId)
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

module.exports = {
    postConversation ,
    getAllConversationsFromUsers ,
    getConversationById ,
    patchConversation ,
    deleteConversation
}