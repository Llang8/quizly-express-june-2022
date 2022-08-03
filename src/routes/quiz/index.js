const { Router } = require('express')

const QuizRouter = Router()

QuizRouter.route("/:slug")
    .get(require('./quiz.view'))

module.exports = QuizRouter