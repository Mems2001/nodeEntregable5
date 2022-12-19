const db = require('../utils/dataBase');
const {DataTypes} = require('sequelize');

const Users = db.define('users' , {
    id: {
        type: DataTypes.UUID ,
        primaryKey: true
    } ,
    firstname: {
        type: DataTypes.STRING ,
        allowNull: false ,
        validate: {
            len: [1 , 25]
        }
    } ,
    lastname: {
        type: DataTypes.STRING ,
        allowNull: false ,
        validate: {
            len: [1 , 25]
        }
    } ,
    email: {
        type: DataTypes.STRING ,
        allowNull: false ,
        unique: true ,
        validate: {
            isEmail: true
        }
    } ,
    password: {
        type: DataTypes.STRING ,
        allowNull: false
    } ,
    profileImage: {
        type: DataTypes.STRING ,
        field: 'profile_image'
    } ,
    phone: {
        type: DataTypes.STRING ,
        allowNull: false ,
        unique: true 
    } ,
    status: {
        type: DataTypes.STRING ,
        defaultValue: 'active'
    } ,
    isVerified: {
        type: DataTypes.STRING ,
        defaultValue: false ,
        field: 'is_verified'
    }
}) ;

module.exports = Users