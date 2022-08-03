const express = require('express')

// Loading in our environment variables
const dotenv = require('dotenv')
dotenv.config()

const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')

const { connectDB } = require('./src/db')

const initializeRoutes = require('./src/routes')

const app = express()

connectDB()

app.set('view engine', 'ejs')
app.set('views', './src/templates/views')

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.get('/', (req,res) => {
    res.send('Hello world')
})

initializeRoutes(app)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on PORT ${ process.env.PORT }`)
})