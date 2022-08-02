
const { GraphQLObjectType, GraphQLSchema } = require('graphql')
const queries = require('./queries')

// Define QueryType
const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Queries",
    fields: queries
})

module.exports = new GraphQLSchema({
    query: QueryType
})