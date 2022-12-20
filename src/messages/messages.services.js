const { findParticipantByUserIdAndConversationId } = require('../participants/participants.controllers');
const messagesControllers = require('./messages.controllers');

const getAllMessagesFromConversations = (req , res) => {
    const id = req.params.conversation_id;

    messagesControllers.findAllMessagesFromConversation(id)
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

const postMessage = (req ,res) => {
    const userId = req.user.id ;
    const conversationId = req.params.conversation_id;
    const {message} = req.body;
    
    messagesControllers.createMessage({
        userId , conversationId , message
    })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const getOneMessage = async(req , res) => {
    const messageId = req.params.message_id;
    const conversationId = req.params.conversation_id;
    
    findParticipantByUserIdAndConversationId(req.user.id , conversationId)
        // console.log(altId)
        .then(response => {
                if (response) {
                messagesControllers.findOneMessage(messageId , conversationId)
                    .then(data => {
                        if (data) {
                            res.status(200).json(data)
                        } else {
                            res.status(404).json({
                                message: 'Message not found'
                            })
                        }
                    })
                    .catch(err => {
                        res.status(400).json({
                            message: err.message
                        })
                    })
                } else {
                    res.status(404).json({
                        message: 'You are not a participant in this conversation'
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
        // } else {
        //     res.status(404).json({
        //         message: 'You are not a participant of this conversation'
        //     })
        // }
    // } catch (error) {
    //     res.status(400).json({
    //         message: error.message
    //     })
    // }

};

const deleteMessage = (req , res) => {
    const messageId = req.params.message_id;
    const conversationId = req.params.conversation_id;
    const userId = req.user.id;

    messagesControllers.destroyMessage(messageId , conversationId , userId)
        .then(data => {
            if (data) {
                res.status(200).json({
                    message: 'Message deleted'
                })
            } else {
                res.status(404).json({
                    message: 'Message not found'
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
    getAllMessagesFromConversations ,
    postMessage ,
    getOneMessage ,
    deleteMessage
}