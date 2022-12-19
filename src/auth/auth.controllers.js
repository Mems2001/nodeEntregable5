const { findUserByEmail } = require("../users/users.controllers")
const { comparePass } = require("../utils/crypto")

const checkCredentials = async(email , password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPass =comparePass(password , user.password)
        if (verifyPass) {
            return user
        } else {
            return null
        }
    } catch (error) {
        return null
    }
};

// console.log(checkCredentials('1@test.com' , '1test'));

module.exports = {
    checkCredentials
}