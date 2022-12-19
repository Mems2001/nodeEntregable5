const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Conversations = require('./conversations.model');
const Users = require('./users.model');

const Participants = db.define('participants' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    conversationId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'conversation_id',
        references: {
            key: 'id' ,
            model: Conversations
        }
    } ,
    userId: {
        type: DataTypes.UUID ,
        allowNull: false ,
        field: 'user_id' ,
        references: {
            key: 'id' ,
            model: Users
        }
    }
});

module.exports = Participants