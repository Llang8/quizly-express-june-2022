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

/* Import and use cookies */
const cookieParser = require('cookie-parser')
app.use(cookieParser())

/* Import and use authentication middleware */
const { authenticate } = require('./src/middleware/auth')
app.use(authenticate)

/* Import and use userData middleware */
const { userData } = require('./src/middleware/userData')
app.use(userData)

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: true }))

initializeRoutes(app)

app.listen(process.env.PORT, (req, res) => {
    console.log(`Server running on PORT ${ process.env.PORT }`)
})