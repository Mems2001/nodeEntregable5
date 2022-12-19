require('dotenv').config();

module.exports = {
    api: {
        JwtSecret : process.env.JWT_KEY ,
        port: process.env.PORT ,
        host: process.env.HOST
    } ,
    db: {
        host: process.env.DB_HOST ,
        username: process.env.DB_USER ,
        password: process.env.DB_PASS ,
        name: process.env.DB_NAME ,
        port: process.env.DB_PORT
    }
}