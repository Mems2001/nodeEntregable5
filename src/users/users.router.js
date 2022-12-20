const router = require('express').Router();
const usersServices = require('./users.services');
const passportJWT = require('../middleware/auth.middleware');

router.route('/')
    .post(usersServices.postUser)

router.route('/me')
    .get(passportJWT.authenticate('jwt' , {session:false}) , usersServices.getMyUser)
    .patch(passportJWT.authenticate('jwt' , {session:false}) , usersServices.patchMyUser)

module.exports = router