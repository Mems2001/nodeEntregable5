const db = require('../utils/dataBase');
const Conversations = require('./conversations.model');
const Messages = require('./messages.model');
const Participants = require('./participants.model');
const Users = require('./users.model');

const initModels = () => {
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)
};

module.exports = initModels