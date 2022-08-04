const axios = require('axios')

module.exports = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.redirect('/auth/login')
        return
    }

    const mutation = `
        mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password)
        }
    `

    try {
        const { data } = await axios.post('http://localhost:3000/graphql', 
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    password: req.body.password
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        // res.send(data)
        const token = data.data.login
        
        res.cookie('jwt', token)

        res.redirect('/')

    } catch(err) {
        console.log(err)
        res.redirect('/auth/login')
    }
}