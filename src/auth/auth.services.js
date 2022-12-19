const jwt = require('jsonwebtoken');
const authControllers = require('./auth.controllers');
const {JwtSecret} = require('../../config').api;

const postLogin = (req , res) => {
    const {email , password} = req.body;

    if (email && password) {
        authControllers.checkCredentials(email , password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({
                        id: data.id ,
                        firstname: data.firstname ,
                        lastname: data.lastname ,
                        email: data.email
                    }, JwtSecret );

                    res.status(200).json({
                        message: 'Right credentials' ,
                        token
                    })
                } else {
                    res.status(401).json({
                        message: 'Invalid credentials'
                    })
                }
            })
            .catch(err => {
                res.status(400).json({
                    message: err.message
                })
            })
    } else {
        res.status(400).json({
            message: 'Missing data' ,
            fields: {
                email: 'email@test.com' ,
                password: 'string'
            }
        })
    }
};

module.exports = {
    postLogin
}