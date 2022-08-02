const { GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql')

const { User } = require('../models')

const UserType = new GraphQLObjectType({
    name: "User",
    description: "User type",
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

module.exports = {
    UserType
}