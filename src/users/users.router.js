const router = require('express').Router();
const usersServices = require('./users.services');

router.route('/')
    .post(usersServices.postUser)

module.exports = router