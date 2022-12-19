const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');
const Conversations = require('./conversations.model');

const Messages = db.define('messages' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    message: {
        type: DataTypes.STRING ,
        allowNull: false
    } ,
    userId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'user_id' ,
        references: {
            key: 'id' ,
            model: Users
        }
    } ,
    conversationId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'conversation_id' ,
        references: {
            key: 'id' ,
            model: Conversations
        }
    }
});

module.exports = Messages