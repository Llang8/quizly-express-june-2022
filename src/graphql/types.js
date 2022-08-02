const { GraphQLObjectType, GraphQLID, GraphQLString, 
    GraphQLList, GraphQLInt, GraphQLFloat } = require('graphql')

const { User, Quiz, Question, Submission } = require('../models')

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        quizzes: {
            type: GraphQLList(QuizType),
            resolve(parent, args) {
                return Quiz.find({ userId: parent.id })
            }
        },
        submissions: {
            type: GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({ userId: parent.id })
            }
        }
    })
})

const QuizType = new GraphQLObjectType({
    name: "Quiz",
    description: "Quiz type",
    fields: () => ({
        id: { type: GraphQLID },
        slug: { type: GraphQLString },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        questions: {
            type: GraphQLList(QuestionType),
            resolve(parent, args) {
                return Question.find({ quizId: parent.id })
            }
        },
        submissions: {
            type: GraphQLList(SubmissionType),
            resolve(parent, args) {
                return Submission.find({ quizId: parent.id })
            }
        },
        avgScore: {
            type: GraphQLFloat,
            async resolve(parent, args) {
                const submissions = await Submission.find({ quizId: parent.id })

                let score = 0

                /* Calculating total score of all submissions */
                for (const submission of submissions) {
                    score += submission.score
                }

                /* Calculating the average score */
                return score / submissions.length
            }
        }
    })
})

const QuestionType = new GraphQLObjectType({
    name: "Question",
    description: "Question Type",
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        correctAnswer: { type: GraphQLString },
        order: { type: GraphQLInt },
        quizId: { type: GraphQLString },
        quiz: {
            type: QuizType,
            resolve(parent, args) {
                return Quiz.findById(parent.quizId)
            }
        }
    })
})

const SubmissionType = new GraphQLObjectType({
    name: "Submission",
    description: "Submission Type",
    fields: () => ({
        id: { type: GraphQLID },
        userId: { type: GraphQLString },
        quizId: { type: GraphQLString },
        score: { type: GraphQLInt },
        user: {
            type: UserType,
            resolve(parent, args) {
                return User.findById(parent.userId)
            }
        },
        quiz: {
            type: QuizType,
            resolve(parent, args) {
                return Quiz.findById(parent.quizId)
            }
        }
    })
})

module.exports = {
    UserType,
    QuizType,
    QuestionType,
    SubmissionType
}