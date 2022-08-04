const jwt = require('jsonwebtoken')

const createJwt = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = { 
    createJwt
}