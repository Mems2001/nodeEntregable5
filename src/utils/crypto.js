const bcrypt = require('bcrypt');

const hashPass = (plainPass) => {
    return bcrypt.hashSync(plainPass , 10)
};

const comparePass = (plainPass , hashedPass) => {
    return bcrypt.compareSync(plainPass , hashedPass)
};

// console.log(comparePass('1test' , '$2b$10$keckksLnNFm0Q6iYwqcYQe1.YsIk6enC79HI/mPceSLUMm0qWTxyS'))

module.exports = {
    hashPass ,
    comparePass
}