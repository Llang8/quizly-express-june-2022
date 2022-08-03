const { GraphQLString, GraphQLList, GraphQLNonNull } = require('graphql')
const { User, Quiz, Question, Submission } = require('../models')
const { QuestionInputType, AnswerInputType } = require('./types')

/* 
* Registration mutation
*/
const register = {
    type: GraphQLString,
    args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        try {
            const user = new User({
                username: args.username,
                email: args.email,
                password: args.password
            })
    
            await user.save()
    
            return 'User Created'
        }
        catch(err) {
            return err
        }
    }
}

/* 
* Login mutation
*/
const login = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const user = await User.findOne({ email: args.email })

        if (!user) {
            return 'User with this email does not exist'
        } else if (user.password !== args.password) {
            return 'Password does not match'
        } else {
            return 'User logged in'
        }
    }
} 

/* 
* Quiz creation
*/
const createQuiz = {
    type: GraphQLString,
    args: {
        questions: {
            type: new GraphQLNonNull(new GraphQLList(QuestionInputType))
        },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString }
    },
    async resolve(parent, args) {
        /* Generate our slug from the title */
        let slug = args.title.toLowerCase()
            .replaceAll(/[^\w ]/g, '')
            .replaceAll(' ', '-')

        let fullSlug = ''
        
        /* 
        * Build a unique slug, make sure that slug doesn't
        * exist before continuing with creating our Quiz
        */
        while(true) {
            let number = Math.floor(Math.random()*10000)
    
            fullSlug = slug + '-' + number

            const checkQuiz = await Quiz.findOne({ slug: fullSlug })

            if (!checkQuiz) {
                break
            } 
        }

        const quiz = new Quiz({
            title: args.title,
            description: args.description,
            slug: fullSlug,
            userId: args.userId
        })

        await quiz.save()

        for (const question of args.questions) {
            const questionItem = new Question({
                title: question.title,
                correctAnswer: question.correctAnswer,
                order: question.order,
                quizId: quiz.id
            })
            questionItem.save()
        }

        return quiz.slug
    }
}

/* 
* Submit quiz and calculate score
*/
const submitQuiz = {
    type: GraphQLString,
    args: {
        answers: {
            type: new GraphQLNonNull(new GraphQLList(AnswerInputType))
        },
        userId: { type: GraphQLString },
        quizId: { type: GraphQLString }
    },
    async resolve(parent, args) {
        const questions = await Question.find({ quizId: args.quizId })
        let correct = 0
        let questionCount = questions.length

        for (const answer of args.answers) {
            const question = await Question.findById(answer.questionId)

            if (question.correctAnswer.toLowerCase() === answer.answer.toLowerCase()) {
                correct++
            }
        }

        const total = (correct / questionCount) * 100

        const submission = new Submission({
            userId: args.userId,
            quizId: args.quizId,
            score: total
        })

        submission.save()

        return submission.id
    }
}

module.exports = {
    register,
    login,
    createQuiz,
    submitQuiz
}