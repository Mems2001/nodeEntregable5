const usersControllers = require('./users.controllers');

const postUser = (req ,res) => {
    const { firstname , lastname , email , password , phone , profileImage } = req.body;

    usersControllers.createUser({
        firstname , lastname , email , password , phone , profileImage
    })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message ,
                fields: {
                    firstname: 'string' ,
                    lastname: 'string' ,
                    email: 'email@test.com' ,
                    password: 'string' ,
                    phone: '0999999999' ,
                    profileImage: 'link'
                }
            })
        })
};

const getMyUser = (req ,res) => {
    const id = req.user.id;

    usersControllers.findUserById(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
};

const patchMyUser = (req ,res) => {
    const id = req.user.id;
    const {firstname , lastname , email , profileImage , phone} = req.body;

    usersControllers.updateUser({
        firstname , lastname , email , profileImage , phone
    } , id)
        .then(data => {
            res.status(200).json({
                message: 'User succesfully updated'
            })
        })
        .catch(err => {
            res.status(400).json({
                message: err.message
            })
        })
}

module.exports = {
    postUser ,
    getMyUser ,
    patchMyUser
}