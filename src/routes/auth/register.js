const axios = require('axios')

module.exports = async (req, res) => {
    if (!req.body.email || !req.body.password
        || !req.body.username || !req.body.confirmPassword
        || (req.body.password !== req.body.confirmPassword)) {
        res.redirect('/auth/register')
        return
    }

    const mutation = `
        mutation register($email: String!, $password: String!, $username: String!) {
            register(email: $email, password: $password, username: $username)
        }
    `

    try {
        const { data } = await axios.post('http://localhost:3000/graphql', 
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        res.redirect('/auth/login')

    } catch(err) {
        console.log(err)
        res.redirect('/auth/register')
    }
}