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

module.exports = {
    postUser
}