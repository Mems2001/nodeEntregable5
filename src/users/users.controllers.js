const Users = require('../models/users.model');
const uuid = require('uuid');
const { hashPass } = require('../utils/crypto');

const findUserByEmail = async(email) => {
    return await Users.findOne({
        where: {
            email
        }
    })
};

const findUserById = async(id) => {
    return await Users.findOne({
        where: {
            id
        }
    })
};

const findUserByPhone = async(phone) => {
    return await Users.findOne({
        where: {
            phone
        }
    })
};

const createUser = async(obj) => {
    return await Users.create({
        id: uuid.v4() ,
        firstname: obj.firstname ,
        lastname: obj.lastname ,
        email: obj.email ,
        password: hashPass(obj.password) ,
        profileImage: obj.profileImage ,
        phone: obj.phone
    })
};

module.exports = {
    findUserByEmail , 
    findUserById ,
    createUser ,
    findUserByPhone
}