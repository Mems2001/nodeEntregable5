const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');
const Users = require('./users.model');

const Conversations = db.define('conversations' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    title: {
        type: DataTypes.STRING ,
        allowNull: false
    } ,
    imageUrl: {
        type: DataTypes.STRING ,
        field: 'image_url' 
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

module.exports = Conversations