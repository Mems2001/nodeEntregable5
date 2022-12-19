const passport = require('passport');
const {JwtSecret} = require('../../config').api;
const {findUserById} = require('../users/users.controllers');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: JwtSecret
}

passport.use(
    new JwtStrategy(options , (tokenDecoded , done) => {
        findUserById(tokenDecoded.id)
            .then(data => {
                if(data) {
                    done(null , tokenDecoded)
                } else {
                    done(null , false)
                }
            })
            .catch(err => {
                done(err , false)
            })
    })
);

module.exports = passport