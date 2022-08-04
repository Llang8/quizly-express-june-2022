const { Router } = require('express')

const QuizRouter = Router()

QuizRouter.route('/create')
    .get(require('./editor.view'))
    .post(require('./create'))

QuizRouter.route('/success/:slug')
    .get(require('./success.view'))

QuizRouter.route('/:slug/submit')
    .post(require('./submit'))

QuizRouter.route('/results/:id')
    .get(require('./submission.view'))

QuizRouter.route("/:slug")
    .get(require('./quiz.view'))



module.exports = QuizRouter