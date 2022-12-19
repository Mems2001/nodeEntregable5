const authServices = require('./auth.services');
const router = require('express').Router();

router.post('/login' , authServices.postLogin);

module.exports = router