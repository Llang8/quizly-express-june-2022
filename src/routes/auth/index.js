const { Router } = require('express')

const AuthRouter = Router()

AuthRouter.route("/login")
    .get(require('./login.view'))

AuthRouter.route("/register")
    .get(require('./register.view'))

module.exports = AuthRouter