const { GraphQLList, GraphQLID, GraphQLString } = require('graphql')
const { UserType, QuizType, SubmissionType } = require('./types')
const { User, Quiz, Submission } = require('../models')

/* 
* Query all users in the database
*/
const users = {
    type: new GraphQLList(UserType),
    description: "Query all users in the database",
    resolve(parent, args) {
        return User.find()
    }
}

/* 
* Query user by ID
*/
const user = {
    type: UserType,
    description: "Query a user by their ID",
    args: {
        id: { type: GraphQLID }
    },
    resolve(parent, args) {
        return User.findById(args.id)
    }
}

/* 
* Query quizzes by their slug
*/
const quizBySlug = {
    type: QuizType,
    description: "Query quizzes by their slug",
    args: {
        slug: { type: GraphQLString }
    },
    resolve(parent, args) {
        return Quiz.findOne({ slug: args.slug })
    }
}

/* 
* Query submissions by their id
*/
const submissionById = {
    type: SubmissionType,
    args: {
        id: { type: GraphQLString }
    },
    resolve(parent, args) {
        return Submission.findById(args.id)
    }
}

module.exports = {
    users,
    user,
    quizBySlug,
    submissionById
}